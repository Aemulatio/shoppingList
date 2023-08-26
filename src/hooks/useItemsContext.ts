import { useContext } from "react";
import { ContextValue, ItemsContext } from "../contexts/ItemsContext.tsx";

export const useItemsContext = (): ContextValue => {
  const context = useContext(ItemsContext);
  if (context === null) throw new Error("No context");
  return context;
};
