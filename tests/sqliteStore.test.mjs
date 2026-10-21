import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, rmdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import { createSQLiteStore } from '../storage/sqliteStore.ts';

function setup(t) {
  const directory = mkdtempSync(path.join(tmpdir(), 'workout-sqlite-test-'));
  const filename = path.join(directory, 'workout.db');
  const connections = new Set();
  function connect() {
    const database = new DatabaseSync(filename);
    connections.add(database);
    return {
      database,
      adapter: {
        async execAsync(sql) { database.exec(sql); },
        async runAsync(sql, ...params) { return database.prepare(sql).run(...params); },
        async getFirstAsync(sql, ...params) { return database.prepare(sql).get(...params) ?? null; },
      },
      close() { database.close(); connections.delete(database); },
    };
  }
  t.after(() => {
    for (const database of connections) database.close();
    for (const suffix of ['', '-wal', '-shm']) rmSync(filename + suffix, { force: true });
    rmdirSync(directory);
  });
  return { connect };
}

test('saved exercises and timer survive closing and reopening the database', async t => {
  const { connect } = setup(t);
  const first = connect();
  const store = createSQLiteStore(async () => first.adapter);
  const workout = JSON.stringify([{ id: 1, name: 'Curls', sets: [{ id: 1, weight: '18', reps: '12', completed: true }] }]);
  const timer = JSON.stringify({ accumulated: 8000, startedAt: null });
  assert.equal(await store.getItem('missing'), null);
  await store.setItem('workout-tracker:exercises:v1', workout);
  await store.setItem('workout-tracker:timer:v1', timer);
  assert.equal(first.database.prepare('PRAGMA journal_mode').get().journal_mode, 'wal');
  first.close();
  const reopened = connect();
  const restored = createSQLiteStore(async () => reopened.adapter);
  assert.equal(await restored.getItem('workout-tracker:exercises:v1'), workout);
  assert.equal(await restored.getItem('workout-tracker:timer:v1'), timer);
});

test('rapid edits finish in order and update a single row', async t => {
  const { connect } = setup(t);
  const { adapter, database } = connect();
  let opens = 0;
  const store = createSQLiteStore(async () => { opens++; return adapter; });
  await Promise.all(Array.from({ length: 30 }, (_, i) => store.setItem('weight', String(i))));
  assert.equal(await store.getItem('weight'), '29');
  assert.equal(database.prepare('SELECT COUNT(*) AS total FROM app_state').get().total, 1);
  assert.equal(typeof database.prepare('SELECT updated_at FROM app_state').get().updated_at, 'number');
  assert.equal(opens, 1);
});

test('input is bound as data rather than interpolated into SQL', async t => {
  const { connect } = setup(t);
  const { adapter } = connect();
  const store = createSQLiteStore(async () => adapter);
  const key = "'; DROP TABLE app_state; --";
  const value = 'Dumbbell "curls" — 18 kg';
  await store.setItem(key, value);
  assert.equal(await store.getItem(key), value);
  await store.setItem('normal', 'still works');
  assert.equal(await store.getItem('normal'), 'still works');
});

test('a failed write is reported and does not block later saves', async t => {
  const { connect } = setup(t);
  const { adapter } = connect();
  let fail = true;
  const store = createSQLiteStore(async () => ({ ...adapter, async runAsync(...args) {
    if (fail) { fail = false; throw new Error('Disk full'); }
    return adapter.runAsync(...args);
  } }));
  await assert.rejects(store.setItem('weight', '14'), /Disk full/);
  await store.setItem('weight', '18');
  assert.equal(await store.getItem('weight'), '18');
});

test('a failed connection can be retried without deleting existing data', async t => {
  const { connect } = setup(t);
  const { adapter } = connect();
  let fail = true;
  const store = createSQLiteStore(async () => {
    if (fail) { fail = false; throw new Error('Database unavailable'); }
    return adapter;
  });
  await assert.rejects(store.getItem('weight'), /Database unavailable/);
  await store.setItem('weight', '18');
  assert.equal(await store.getItem('weight'), '18');
});
