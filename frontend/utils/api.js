// frontend/utils/api.js
import { auth } from '../firebaseConfig';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig.extra.apiBaseUrl;

export const api = async (url, method = 'GET', data = null) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const idToken = await user.getIdToken();

  const res = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    ...(data && { body: JSON.stringify(data) }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
};

