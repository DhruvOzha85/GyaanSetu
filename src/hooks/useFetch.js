import { useState, useEffect, useRef } from 'react';
import { getErrorMessage } from '../utils/errorHandler';

/**
 * useFetch - Standardized hook for API operations
 * @param {Function} fetchFn - The API service function to call
 * @param {Array} deps - Dependency list for the fetch function
 * @param {boolean} autoFetch - Whether to trigger fetch immediately
 */
export const useFetch = (fetchFn, deps = [], autoFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);
  const autoFetchRef = useRef(autoFetch);

  const execute = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFn(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetchRef.current) {
      execute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps]); // Use spread here, ignore lint rule for generic hook

  const refetch = (...args) => {
    autoFetchRef.current = true;
    return execute(...args);
  };

  return { data, loading, error, refetch, setData };
};

export default useFetch;
