import { ItemProps } from "../contexts/ItemsContext.tsx";

export const setLocalStorage = (key: string, value: ItemProps[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const readLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value === null) return [];
  return JSON.parse(value);
};
