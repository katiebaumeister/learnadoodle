import apiClient from './apiClient';

export const getRecords = async (family_id) => {
  return await apiClient(`/api/get_records?family_id=${family_id}`);
};

export const generateJournal = async (family_id) => {
  return await apiClient('/api/generate_journal', 'POST', { family_id });
};

export const generateReport = async (family_id) => {
  return await apiClient('/api/generate_report', 'POST', { family_id });
};
