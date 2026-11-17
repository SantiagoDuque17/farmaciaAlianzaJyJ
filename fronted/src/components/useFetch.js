import { useEffect, useState, useCallback } from 'react';

// Ejecuta una función async al montar y expone { data, loading, error, reload }
export function useFetch(fn) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: '' }));
    fn()
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((e) => setState({ data: null, loading: false, error: e.message }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(load, [load]);
  return { ...state, reload: load };
}
