import * as React from "react";
import { useAuthContext } from "./useAuthContext";

export function useLogin() {
  const [error, setError] = React.useState<null | string>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { dispatch } = useAuthContext();

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  }

  return { login, error, isLoading };
}
