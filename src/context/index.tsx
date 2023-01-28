import React, { createContext, useReducer, ReactNode } from "react";

export const actions = {
  SET_ACCESS_TOKEN: "SET_ACCESS_TOKEN",
};

export const getAccessToken = () => {
  const sat = localStorage.getItem("at");
  if (typeof sat == "string") {
    const at: string = JSON.parse(sat);
    return at;
  }
  return null;
};

interface State {
  accessToken: string | null;
}
interface Action {
  type: string;
  payload: string;
}
const initialState: State = {
  accessToken: getAccessToken(),
};

export const setAccessToken = (token: string) => {
  return {
    type: actions.SET_ACCESS_TOKEN,
    payload: token,
  };
};

export const store = createContext<State | any>(null);

function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case actions.SET_ACCESS_TOKEN:
      if (action.payload == null) return state;
      localStorage.setItem("at", JSON.stringify(action.payload));
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
}

interface Provider {
  children: ReactNode;
}

export function StoreProvider(props: Provider): any {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: any = { state, dispatch };
  return <store.Provider value={value}>{props.children}</store.Provider>;
}

// export const store = createStore(reducer);
