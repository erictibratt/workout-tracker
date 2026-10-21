import { openDatabaseAsync } from 'expo-sqlite';

import { createSQLiteStore } from './sqliteStore';

// Open on demand after mounting, never during static HTML rendering.
const store = createSQLiteStore(() => openDatabaseAsync('workout-tracker.db'));

export const getStoredValue = store.getItem;
export const setStoredValue = store.setItem;
