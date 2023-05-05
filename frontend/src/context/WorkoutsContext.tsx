import { createContext, useReducer } from "react";

const initialState = {
  workouts: null,
};

// export const WorkoutsContext = createContext(initialState);

type WorkoutsReducerProps = {
  state: { workouts: Workout[] | null };
  action:
    | {
        type: "SET_WORKOUTS";
        payload: Workout[];
      }
    | {
        type: "ADD_WORKOUT";
        payload: Workout;
      }
    | {
        type: "DELETE_WORKOUT";
        payload: Workout["_id"];
      };
};

export const WorkoutsContext = createContext<{
  state: WorkoutsReducerProps["state"];
  dispatch: React.Dispatch<WorkoutsReducerProps["action"]>;
}>({
  state: initialState,
  dispatch: () => null,
});

function workoutsReducer(
  state: WorkoutsReducerProps["state"],
  action: WorkoutsReducerProps["action"]
) {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "ADD_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts!],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts!.filter((e) => e._id !== action.payload),
      };

    default:
      return state;
  }
}

export const WorkoutsContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(workoutsReducer, initialState);
  return (
    <WorkoutsContext.Provider value={{ state: { ...state }, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
