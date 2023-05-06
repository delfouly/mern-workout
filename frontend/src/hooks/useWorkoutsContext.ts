import * as React from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

export function useWorkoutsContext() {
  const context = React.useContext(WorkoutsContext);
  if (!context) {
    throw Error(
      "useWorkoutsContext must be used inside WorkoutsContextProvider"
    );
  }
  return context;
}
