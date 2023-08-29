import {
  createContext,
  type Dispatch,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";
import { readLocalStorage, setLocalStorage } from "../utils";

export type ItemProps = {
  id: number | string;
  done: boolean;
  text: string;
};

export type ContextValue = {
  state: ItemProps[];
  dispatch: Dispatch<Action>;
};

export const ItemsContext = createContext<ContextValue | null>(null);

type ActionTypes = "ADD" | "DELETE" | "READ" | "SELECT_ALL";

const Actions: Record<ActionTypes, ActionTypes> = {
  ADD: "ADD",
  DELETE: "DELETE",
  READ: "READ",
  SELECT_ALL: "SELECT_ALL",
};

type Action = {
  type: ActionTypes;
  payload?: Partial<ItemProps>;
};

const reducer = (state: ItemProps[], action: Action) => {
  switch (action.type) {
    case Actions.ADD:
      if (!action.payload) return;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setLocalStorage("items", [...state, action.payload]);
      return [...state, action.payload];
    case Actions.DELETE:
      if (!action.payload) return;
      setLocalStorage(
        "items",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        state.filter((item) => item.id !== action.payload.id),
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return state.filter((item) => item.id !== action.payload.id);
    case Actions.READ:
      return readLocalStorage("items");
    case Actions.SELECT_ALL:
      return [...state.map((item) => ({ ...item, done: true }))];
    default:
      return state;
  }
};
export const Context = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    dispatch({ type: Actions.READ });
    // window.onbeforeunload = () => false;
  }, []);
  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
