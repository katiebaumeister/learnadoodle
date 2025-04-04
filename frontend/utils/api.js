// frontend/utils/api.js
import { getIdToken } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const api = async (url, method = 'GET', data = null) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const idToken = await user.getIdToken();

  const res = await fetch(`https://your-api.onrender.com${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    ...(data && { body: JSON.stringify(data) })
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return res.json();
};
