import { useCallback, useEffect, useRef, useState, type SetStateAction } from 'react';
import { getStoredValue, setStoredValue } from '@/storage/persistentStorage';

// Hydrate after mounting so static HTML and the first client render agree.
export function usePersistedState<T>(key: string, initialValue: T, validate: (value: unknown) => value is T) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);
  const canSave = useRef(false);
  const currentValue = useRef(initialValue);
  const revision = useRef(0);

  useEffect(() => {
    let cancelled = false;
    canSave.current = false;

    async function load() {
      try {
        const saved = await getStoredValue(key);
        if (cancelled) return;
        if (saved !== null) {
          const parsed: unknown = JSON.parse(saved);
          if (!validate(parsed)) throw new Error('Invalid saved data');
          currentValue.current = parsed;
          setValue(parsed);
        }
        canSave.current = true;
        setStorageError(null);
      } catch {
        if (!cancelled) setStorageError('Saved data could not be loaded. Keep the app open and check device storage before restarting.');
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }

    void load();
    return () => { cancelled = true; canSave.current = false; };
  }, [key, validate]);

  const updateValue = useCallback((next: SetStateAction<T>) => {
    if (!canSave.current) return;
    const updated = typeof next === 'function' ? (next as (value: T) => T)(currentValue.current) : next;
    currentValue.current = updated;
    setValue(updated);
    const request = ++revision.current;
    // SQLite writes are queued by the store. Web writes still happen immediately.
    void setStoredValue(key, JSON.stringify(updated)).then(() => {
      if (canSave.current && request === revision.current) setStorageError(null);
    }).catch(() => {
      if (canSave.current && request === revision.current) {
        setStorageError('Changes could not be saved on this device. Keep the app open and check available storage.');
      }
    });
  }, [key]);

  return { value, setValue: updateValue, loaded, storageError };
}
