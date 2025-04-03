import apiClient from './apiClient';

export const getJoySuggestions = async (family_id) => {
  return await apiClient(`/api/joy_corner?family_id=${family_id}`);
};
