import type { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.css";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button className={styles.root} {...props} />;
};
