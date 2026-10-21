// Small adapter surface so the same SQL can be tested with a real SQLite engine.
export interface Database {
  execAsync(sql: string): Promise<void>;
  runAsync(sql: string, ...parameters: (string | number)[]): Promise<unknown>;
  getFirstAsync<T>(sql: string, ...parameters: string[]): Promise<T | null>;
}

export function createSQLiteStore(open: () => Promise<Database>) {
  let database: Promise<Database> | undefined;
  let writes: Promise<unknown> = Promise.resolve();

  function connect() {
    database ??= (async () => {
      const db = await open();
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS app_state (
          key TEXT PRIMARY KEY NOT NULL,
          value TEXT NOT NULL,
          updated_at INTEGER NOT NULL
        );
      `);
      return db;
    })().catch(error => {
      database = undefined;
      throw error;
    });
    return database;
  }

  return {
    async getItem(key: string): Promise<string | null> {
      await writes;
      const db = await connect();
      const row = await db.getFirstAsync<{ value: string }>('SELECT value FROM app_state WHERE key = ?', key);
      return row?.value ?? null;
    },
    setItem(key: string, value: string): Promise<void> {
      // Rapid keystrokes must finish in order: the newest value always wins.
      const write = writes.then(async () => {
        const db = await connect();
        await db.runAsync(
          `INSERT INTO app_state (key, value, updated_at) VALUES (?, ?, ?)
           ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
          key, value, Date.now()
        );
      });
      writes = write.catch(() => {});
      return write;
    },
  };
}
