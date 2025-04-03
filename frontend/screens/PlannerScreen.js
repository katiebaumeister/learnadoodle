import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import useApi from '../hooks/useApi';
import useToast from '../hooks/useToast';
import { triggerPlanner } from '../services/PlannerService';

const PlannerScreen = ({ navigation }) => {
  const { callApi, loading, error } = useApi();
  const toast = useToast();

  const handlePlanner = async () => {
    const result = await callApi(() => triggerPlanner(1)); // Replace 1 with dynamic family_id
    if (result) toast("Planner triggered!");
  };

  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg mb-4">Planner Screen 🧩</Text>
      <Text className="text-sm text-gray-600 mb-4">This will show AI-generated curriculum plans and yearly overview.</Text>

      <Button loading={loading} onPress={handlePlanner}>
        Trigger Planner
      </Button>

      {error && <Text className="text-red-500 mt-2">{error}</Text>}

      <Button style="mt-4" onPress={() => navigation.goBack()}>
        Go Back
      </Button>
    </ScreenWrapper>
  );
};

export default PlannerScreen;
