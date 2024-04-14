// Import other utils
import { ObjectUtils } from "../object";

// Import types
import { UpdateObjectOptionsType } from "../object/index.types";

const localStorageKey = "lcl";
const sessionStorageKey = "ssn";

export const LocalStorageKeys = {
  "player": `_${localStorageKey}$_ply`,
  "settings": `_${localStorageKey}$_sti`
};

export const SessionStorageKeys = {
  "langText": `_${sessionStorageKey}$_lgtxt`,
  "langAbout": `_${sessionStorageKey}$_lgabt`
};

type UpdateItemOptionsType = UpdateObjectOptionsType;

/**
 * Use this function to get key of `LocalStorageKeys`.
 * @param key 
 * @returns 
 */
function getLocalStorageKey(key: string): string {
  return (LocalStorageKeys as any)[key];
}

/**
 * Use this function to get key of `SessionStorageKeys`.
 * @param key 
 * @returns 
 */
function getSessionStorageKey(key: string): string {
  return (SessionStorageKeys as any)[key];
}

/**
 * Use this function to key.
 * @param keyCollection 
 * @param key 
 * @returns 
 */
function __checkKey(keyCollection: any, key: string) {
  for(let k in keyCollection) {
    if(!!(keyCollection[k] === key)) return true;
  }
  return false;
}

/**
 * Use this function to get data from storage.
 * @param key 
 * @returns 
 */
function __getItem<T>(storage: Storage, key: string) {
  let dataString = storage.getItem(key);

  if(!dataString) return null;

  return JSON.parse(dataString) as T;
}

/**
 * __Use Local Storage__
 * 
 * Use this function to save data in storage.
 * @param key 
 * @param data 
 */
function __setItem(storage: Storage, key: string, data: any) {
  data = JSON.stringify(data);
  storage.setItem(key, data);
}

/**
 * Use this function to remove data from storage.
 * @param key 
 * @returns 
 */
function __removeItem(storage: Storage, key: string) {
  storage.removeItem(key);
  return true;
}

/**
 * Use this function to update an item in storage.
 * @param key 
 * @param data 
 * @returns 
 */
function __updateItem<T>(
  storage: Storage,
  keys: any,
  key: string,
  data: T,
  opt: UpdateItemOptionsType
) {
  if(!data || !__checkKey(keys, key)) return;

  let storedData = __getItem<T>(storage, key);

  if(!storedData) {
    __setItem(storage, key, data);
    return data;
  };

  storedData = ObjectUtils.updateObject(storedData, data, opt);

  // Set new item
  __setItem(storage, key, storedData);

  return storedData;
}

// /**
//  * Give `index` to this function and receive the `index`-th item's name.
//  * @param index 
//  * @returns 
//  */
// function __keyName(storage: Storage, index: number) {
//   return storage.key(index);
// }

/**
 * Use this function to clear all items in storage.
 */
function __clearAll(storage: Storage) {
  storage.clear();
}

/**
 * Use this function to get length of local storage.
 * @returns 
 */
function __getLength(storage: Storage) {
  return storage.length;
}

/**
 * __Use Local Storage__
 * 
 * Use this function to save data in local storage.
 * @param key 
 * @param data 
 */
function setItem(key: string, data: any) {
  if(!__checkKey(LocalStorageKeys, key)) return;
  __setItem(localStorage, key, data);
}

/**
 * __Use Session Storage__
 * 
 * Use this function to save data in session storage.
 * @param key 
 * @param data 
 */
function setTempItem(key: string, data: any) {
  if(!__checkKey(SessionStorageKeys, key)) return;
  __setItem(sessionStorage, key, data);
}

/**
 * __Use Local Storage__
 * 
 * Use this function to get data from local storage.
 * @param key 
 * @returns 
 */
function getItem<T>(key: string) {
  if(!__checkKey(LocalStorageKeys, key)) return null;
  return __getItem<T>(localStorage, key);
}

/**
 * __Use Session Storage__
 * 
 * Use this function to get data from session storage.
 * @param key 
 * @returns 
 */
function getTempItem<T>(key: string) {
  if(!__checkKey(SessionStorageKeys, key)) return null;
  return __getItem<T>(sessionStorage, key);
}

/**
 * __Use Local Storage__
 * 
 * Use this function to remove data from local storage.
 * @param key 
 * @returns 
 */
function removeItem(key: string) {
  if(!__checkKey(LocalStorageKeys, key)) return false;
  return __removeItem(localStorage, key);
}

/**
 * __Use Session Storage__
 * 
 * Use this function to remove data from session storage.
 * @param key 
 * @returns 
 */
function removeTempItem(key: string) {
  if(!__checkKey(SessionStorageKeys, key)) return false;
  return __removeItem(sessionStorage, key);
}

/**
 * __Use Local Storage__
 * 
 * Use this function to clear all items in local storage.
 */
function clearAllItem() {
  __clearAll(localStorage);
}

/**
 * __Use Session Storage__
 * 
 * Use this function to clear all items in session storage.
 */
function clearAllTempItem() {
  __clearAll(sessionStorage);
}

/**
 * __Use Local Storage__
 * 
 * Use this function to update an item in local storage.
 * @param key 
 * @param data 
 * @returns 
 */
function updateItem<T>(key: string, data: Partial<T>, opt?: UpdateItemOptionsType) {
  opt = ObjectUtils.setDefaultValues(opt, { canOverrideValues: true });
  return __updateItem(localStorage, LocalStorageKeys, key, data, opt);
}

/**
 * __Use Local Storage__
 * 
 * Use this function to update an item in local storage.
 * @param key 
 * @param data 
 * @returns 
 */
function updateTempItem<T>(key: string, data: Partial<T>, opt?: UpdateItemOptionsType) {
  opt = ObjectUtils.setDefaultValues(opt, { canOverrideValues: true });
  return __updateItem(sessionStorage, SessionStorageKeys, key, data, opt);
}

/**
 * __Use Local Storage__
 * 
 * Use this function to get length of local storage.
 * @returns 
 */
function countItem() {
  return __getLength(localStorage);
}

/**
 * __Use Session Storage__
 * 
 * Use this function to get length of session storage.
 * @returns 
 */
function countTempItem() {
  return __getLength(sessionStorage);
}

export const BrowserStorageUtils = {
  getLocalStorageKey,
  getSessionStorageKey,
  setItem,
  setTempItem,
  getItem,
  getTempItem,
  removeItem,
  removeTempItem,
  updateItem,
  updateTempItem,
  clearAllItem,
  clearAllTempItem,
  countItem,
  countTempItem
};