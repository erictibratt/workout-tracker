// Metro selects this implementation for web, keeping SQLite/WASM out of the PWA.
// Keep the existing keys so installed web apps retain their saved workouts.
export async function getStoredValue(key: string): Promise<string | null> {
  return window.localStorage.getItem(key);
}

export async function setStoredValue(key: string, value: string): Promise<void> {
  window.localStorage.setItem(key, value);
}
