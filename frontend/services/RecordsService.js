import apiClient from './apiClient';

export const getRecords = async (family_id) => {
  return await apiClient(`/api/get_records?family_id=${family_id}`);
};
