import apiClient from './apiClient';

export const getProgress = async (family_id) => {
  return await apiClient(`/api/get_progress?family_id=${family_id}`);
};
