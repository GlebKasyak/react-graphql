import { StorageKeys } from "./constants/commons";

export const setTokenToStorage = (data: string) => localStorage.setItem(StorageKeys.token, data);
export const getTokenFromStorage = () => localStorage.getItem(StorageKeys.token);

export const setIsAuthToStorage = () => localStorage.setItem(StorageKeys.isAuth, JSON.stringify(true));
export const getIsAuthFromStorage = () => Boolean(localStorage.getItem(StorageKeys.isAuth));

export const clearStorage = () => localStorage.clear();