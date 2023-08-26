import {
  createContext,
  type Dispatch,
  type ReactNode,
  useReducer,
} from "react";

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
// type Reducer<State, Action> = (state: State, action: Action) => State;

const reducer = (state: ItemProps[], action: Action) => {
  switch (action.type) {
    case Actions.ADD:
      return [...state, action.payload];
    case Actions.DELETE:
      return state;
    default:
      return state;
  }
};
export const Context = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};
