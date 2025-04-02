import { API_BASE_URL } from './apiConfig';

// Generalized API client
const apiClient = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'API Error');
  }
  return response.json();
};

export default apiClient;
