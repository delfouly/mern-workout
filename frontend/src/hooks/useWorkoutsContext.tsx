import * as React from "react";
import { WorkoutsContext } from "../context/WorkoutsContext";

export function useWorkoutsContext() {
  const context = React.useContext(WorkoutsContext);
  return context;
}
