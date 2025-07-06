type LocalSorageItems = 'accessToken' | 'refreshToken' | 'provider' | 'theme' | 'notification';

export const SetLocalStorageItem = (key: LocalSorageItems, value: any) => {
  localStorage.setItem(key, value);
};

export const GetLocalStorageItem = (key: LocalSorageItems) => {
  return localStorage.getItem(key);
};
