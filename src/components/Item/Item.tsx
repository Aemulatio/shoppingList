import { type FC } from "react";
import styles from "./Item.module.css";
import { type ItemProps } from "../../contexts/ItemsContext.tsx";

export const Item: FC<ItemProps> = ({ text, id, done }) => {
  return (
    <label className={styles.root} key={id}>
      {text}
    </label>
  );
};
