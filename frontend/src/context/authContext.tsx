import * as React from "react";

type AuthAction =
  | {
      type: "LOGIN";
      payload: User;
    }
  | { type: "LOGOUT" };

type AuthContextValue = {
  user: User | null;
  dispatch: React.Dispatch<AuthAction>;
};

const initialState = { user: null };

export const authContext = React.createContext<AuthContextValue>({
  ...initialState,
  dispatch: () => {},
});

export function authReducer(state: { user: User | null }, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
}
