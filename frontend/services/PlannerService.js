import apiClient from './apiClient';

export const triggerPlanner = async (family_id) => {
  return await apiClient('/api/trigger_planner', 'POST', { family_id });
};

export const getPlannerStatus = async (family_id) => {
  return await apiClient(`/api/planner_status?family_id=${family_id}`);
};

export const getCurriculum = async () => {
  return await apiClient('/api/get_subjects_and_units', 'GET');
};
