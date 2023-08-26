import { Item } from "../Item/Item.tsx";
import styles from "./List.module.css";
import { NewItem } from "../NewItem/NewItem.tsx";
import { useItemsContext } from "../../contexts/ItemsContext.tsx";

export const List = () => {
  // const Items = new Array(10).fill("Молоко и еще чтонибудь зазазаза");
  const { state: Items } = useItemsContext();

  return (
    <div className={styles.root}>
      {Items.map((item, key) => (
        <Item {...item} key={key} />
      ))}
      <NewItem />
    </div>
  );
};
