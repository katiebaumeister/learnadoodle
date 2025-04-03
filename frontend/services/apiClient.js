import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000'; // Set this to your Render backend URL

const apiClient = async (url, method = 'GET', data = {}) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  if (!token) throw new Error('User not authenticated');

  const response = await axios({
    url: API_URL + url,
    method,
    data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

export default apiClient;
