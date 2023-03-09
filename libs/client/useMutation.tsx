import { useState } from "react";

interface IMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type MutationResult<T> = [(data: any) => void, IMutationState<T>];

export default function useMutation<T = any>(url: string): MutationResult<T> {
  const [state, setState] = useState<IMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
