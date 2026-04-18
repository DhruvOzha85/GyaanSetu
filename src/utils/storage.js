/**
 * GyaanSetu — LocalStorage & SessionStorage Helpers
 * All storage operations are wrapped in try/catch for safety (Private Browsing, etc.)
 */

// ─── LocalStorage ───────────────────────────────────────────────────

/**
 * Get an item from localStorage, parsed from JSON.
 * @param {string} key
 * @param {*} defaultValue - fallback if key doesn't exist or parsing fails
 * @returns {*}
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
};

/**
 * Set an item in localStorage as JSON.
 * @param {string} key
 * @param {*} value
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save "${key}" to localStorage:`, error);
  }
};

/**
 * Remove an item from localStorage.
 * @param {string} key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove "${key}" from localStorage:`, error);
  }
};

/**
 * Clear all localStorage items.
 */
export const clearAll = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
};

// ─── SessionStorage ─────────────────────────────────────────────────

/**
 * Get an item from sessionStorage, parsed from JSON.
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export const getSessionItem = (key, defaultValue = null) => {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch {
    return defaultValue;
  }
};

/**
 * Set an item in sessionStorage as JSON.
 * @param {string} key
 * @param {*} value
 */
export const setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to save "${key}" to sessionStorage:`, error);
  }
};

/**
 * Remove an item from sessionStorage.
 * @param {string} key
 */
export const removeSessionItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove "${key}" from sessionStorage:`, error);
  }
};

/**
 * Clear all sessionStorage items.
 */
export const clearSession = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.warn('Failed to clear sessionStorage:', error);
  }
};
const storage = {
  getItem,
  setItem,
  removeItem,
  clearAll,
  getSessionItem,
  setSessionItem,
  removeSessionItem,
  clearSession,
};

export default storage;
