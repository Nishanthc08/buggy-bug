import { useState, useEffect, useCallback } from 'react';

// Custom hook for handling async operations with loading states
const useAsync = (asyncFunction, immediate = true, deps = []) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // The execute function wraps asyncFunction and handles setting state for pending, resolved, and rejected promises
  const execute = useCallback(() => {
    setStatus('pending');
    setData(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setData(response);
        setStatus('resolved');
        return response;
      })
      .catch((error) => {
        setError(error);
        setStatus('rejected');
        throw error;
      });
  }, [asyncFunction]);

  // Call execute if we want to fire it right away. Otherwise execute can be called later, such as in an onClick handler
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate, ...deps]);

  return {
    execute,
    status,
    data,
    error,
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',
    isIdle: status === 'idle'
  };
};

export default useAsync;
