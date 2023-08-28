import { type FC, useEffect, useRef } from "react";
import styles from "./Item.module.css";
import { type ItemProps } from "../../contexts/ItemsContext.tsx";
import { useItemsContext } from "../../hooks/useItemsContext.ts";

export const Item: FC<ItemProps> = ({ text, id, done }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { dispatch } = useItemsContext();
  useEffect(() => {
    if (!ref || !ref.current) return;
    const element = ref.current;
    const getEvent = (event: MouseEvent) =>
      event.type.search("touch") !== -1 ? event.touches[0] : event;
    let posX1 = 0,
      posX2 = 0;
    const trfRegExp = /[-0-9.]+(?=px)/;

    const touchStart = (e) => {
      console.log(e);
    };
    const touchMove = (e: TouchEvent) => {
      console.log(e);
      const evt = getEvent(e),
        // для более красивой записи возьмем в переменную текущее свойство transform
        style = element.style.transform,
        // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
        transform = +style.match(trfRegExp)[0];

      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;

      element.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
      // можно было бы использовать метод строк .replace():
      // sliderTrack.style.transform = style.replace(trfRegExp, match => match - posX2);
      // но в дальнейшем нам нужна будет текущая трансформация в переменной
    };

    // element.addEventListener("touchstart", touchStart);
    element.addEventListener("touchmove", touchMove);
  }, [ref]);

  const handleDelete = () => {
    dispatch({ type: "DELETE", payload: { id } });
  };
  return (
    <div className={styles.root} ref={ref}>
      <label key={id} className={styles.label}>
        <input type="checkbox" name="done" defaultChecked={done} />
        {text}
      </label>
      <button className={styles.button} onClick={handleDelete}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          {/*<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->*/}
          <path
            fill={"currentColor"}
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
      </button>
    </div>
  );
};
