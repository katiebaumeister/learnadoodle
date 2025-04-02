import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import useApi from '../hooks/useApi';
import useToast from '../hooks/useToast';

const FloatingPlannerButton = () => {
  const { callApi, loading, error } = useApi();
  const toast = useToast();

  const triggerPlanner = async () => {
    const result = await callApi('/api/trigger_planner', 'POST', { family_id: 1 }); // Replace with dynamic family_id
    if (result) toast('Planner triggered!');
  };

  return (
    <TouchableOpacity
      onPress={triggerPlanner}
      className="bg-purple-500 p-4 rounded-full absolute bottom-8 right-8 shadow-lg"
    >
      <Text className="text-white font-semibold">{loading ? '...' : 'Planner'}</Text>
    </TouchableOpacity>
  );
};

export default FloatingPlannerButton;
