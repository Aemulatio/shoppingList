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
    const getEvent = (event: TouchEvent | MouseEvent) => {
      if (event instanceof TouchEvent) return event.touches[0];
      return event;
    };
    let posX1 = 50,
      posX2 = 0,
      posInit = 0,
      shown = false;
    const trfRegExp = /[-0-9.]+(?=px)/,
      slideWidth = 50;

    const calculateNewPosition = (newPos: number, posX2: number): number => {
      if (shown) {
        return 0;
      }
      if (posX2 < 0) {
        return 0;
      }
      return newPos > 0 ? 0 : newPos < 50 ? -50 : newPos;
    };

    const touchStart = (e: TouchEvent | MouseEvent) => {
      const evt = getEvent(e);
      posInit = posX1 = evt.clientX;

      element.style.transition = "";

      document.addEventListener("touchmove", touchMove);
      document.addEventListener("touchend", swipeEnd);
      document.addEventListener("mousemove", touchMove);
      document.addEventListener("mouseup", swipeEnd);
    };
    const touchMove = (e: TouchEvent | MouseEvent) => {
      const evt = getEvent(e),
        // для более красивой записи возьмем в переменную текущее свойство transform
        style = element.style.transform;
      // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
      if (style.match(trfRegExp) === null) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const transform = +style.match(trfRegExp)[0];

      posX2 = posX1 - evt.clientX;
      posX1 = evt.clientX;
      const newPos = transform - posX2;
      const translate = calculateNewPosition(newPos, posX2);
      shown = translate >= 50;
      console.log("translate: ", translate);
      console.log("posX2: ", posX2);
      element.style.transform = `translate3d(${translate}px, 0px, 0px)`;
    };
    const swipeEnd = function () {
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("mousemove", touchMove);
      document.removeEventListener("touchend", swipeEnd);
      document.removeEventListener("mouseup", swipeEnd);

      // если курсор двигался, то запускаем функцию переключения слайдов
      if (posInit !== posX1) {
        slide();
      }
    };

    const slide = function () {
      element.style.transition = "transform .5s";
      element.style.transform = `translate3d(-${
        shown ? 0 : slideWidth
      }px, 0px, 0px)`;
    };

    element.addEventListener("touchstart", touchStart);
    element.addEventListener("mousedown", touchStart);
    return () => {
      element.removeEventListener("touchstart", touchStart);
      element.removeEventListener("mousedown", touchStart);
    };
  }, [ref]);

  const handleDelete = () => {
    dispatch({ type: "DELETE", payload: { id } });
  };
  return (
    <div
      className={styles.root}
      ref={ref}
      style={{ transform: "translate3d(0px, 0px, 0px)" }}
    >
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
