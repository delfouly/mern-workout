import * as React from "react";
import { authContext } from "../context/authContext";

export function useAuthContext() {
  const context = React.useContext(authContext);
  if (!context) {
    throw Error("useAuthContext must be used inside AuthContextProvider");
  }
  return context;
}
