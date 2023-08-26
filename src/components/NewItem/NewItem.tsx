import styles from "./NewItem.module.css";
import React, { useId } from "react";
import { useItemsContext } from "../../hooks/useItemsContext.ts";

export const NewItem = () => {
  const { dispatch } = useItemsContext();
  const id = useId();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(e.target as HTMLFormElement).childNodes.length) return;

    dispatch({
      type: "ADD",
      payload: {
        id,
        text: (
          (e.target as HTMLFormElement).childNodes[0]
            .firstChild as HTMLInputElement
        )?.value,
        done: false,
      },
    });

    (
      (e.target as HTMLFormElement).childNodes[0].firstChild as HTMLInputElement
    ).value = "";
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <label title={"Новый элемент"}>
        <input
          type="text"
          placeholder={"Добавить"}
          name={"item"}
          className={styles.input}
        />
      </label>
    </form>
  );
};
