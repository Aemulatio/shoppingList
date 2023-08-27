import {
  createContext,
  type Dispatch,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";
import { setLocalStorage } from "../utils";

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

type ActionTypes = "ADD" | "DELETE";

const Actions: Record<ActionTypes, ActionTypes> = {
  ADD: "ADD",
  DELETE: "DELETE",
};

type Action = {
  type: ActionTypes;
  payload: ItemProps;
};

const reducer = (state: ItemProps[], action: Action) => {
  switch (action.type) {
    case Actions.ADD:
      setLocalStorage("items", [...state, action.payload]);
      return [...state, action.payload];
    case Actions.DELETE:
      setLocalStorage(
        "items",
        state.filter((item) => item.id !== action.payload.id),
      );
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};
export const Context = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);
  useEffect(() => {
    // window.onbeforeunload = () => false;
  });
  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
