import { Button } from "../Button/Button.tsx";
import { useItemsContext } from "../../hooks/useItemsContext.ts";

export const Buttons = () => {
  const { dispatch } = useItemsContext();

  const handleCheckAll = () => {
    dispatch({ type: "SELECT_ALL" });
  };

  return <Button onClick={handleCheckAll}>Выбрать все</Button>;
};
