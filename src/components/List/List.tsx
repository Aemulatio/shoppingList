import { Item } from "../Item/Item.tsx";
import styles from "./List.module.css";
import { NewItem } from "../NewItem/NewItem.tsx";
import { useItemsContext } from "../../hooks/useItemsContext.ts";

export const List = () => {
  const { state: Items } = useItemsContext();

  return (
    <div className={styles.root}>
      {Items.map((item) => (
        <Item {...item} key={item.id} />
      ))}
      <NewItem />
    </div>
  );
};
