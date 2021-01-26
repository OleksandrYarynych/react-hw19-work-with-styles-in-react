export function parseStorageData(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}
