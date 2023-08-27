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

type ActionTypes = "ADD" | "DELETE" | "READ";

const Actions: Record<ActionTypes, ActionTypes> = {
  ADD: "ADD",
  DELETE: "DELETE",
  READ: "READ",
};

type Action = {
  type: ActionTypes;
  payload?: ItemProps;
};

const reducer = (state: ItemProps[], action: Action) => {
  switch (action.type) {
    case Actions.ADD:
      if (!action.payload) return;
      setLocalStorage("items", [...state, action.payload]);
      return [...state, action.payload];
    case Actions.DELETE:
      if (!action.payload) return;
      setLocalStorage(
        "items",
        state.filter((item) => item.id !== action.payload.id),
      );
      return state.filter((item) => item.id !== action.payload.id);
    case Actions.READ:
      return readLocalStorage("items");
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
