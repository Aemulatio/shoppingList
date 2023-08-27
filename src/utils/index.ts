import { ItemProps } from "../contexts/ItemsContext.tsx";

export const setLocalStorage = (key: string, value: ItemProps[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
