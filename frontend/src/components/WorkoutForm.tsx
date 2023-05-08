import * as React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = React.useState("");
  const [load, setLoad] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [error, setError] = React.useState(null);
  const { dispatch } = useWorkoutsContext();
  const [emptyFields, setEmptyFields] = React.useState<string[]>([]);
  const { user } = useAuthContext();
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${user!.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      dispatch({ type: "ADD_WORKOUT", payload: json });
      setError(null);
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setReps("");
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h4>Add a new workout</h4>
      <label>Title: </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Load (kg): </label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label>Reps: </label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add workout</button>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
