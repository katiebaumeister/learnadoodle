import { useState } from 'react';
import apiClient from '../services/apiClient';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callApi = async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient(endpoint, method, body);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
}
