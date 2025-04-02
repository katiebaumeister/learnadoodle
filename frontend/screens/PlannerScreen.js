import React from 'react';
import { View, Text, Button } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const PlannerScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg mb-4">Planner Screen 🧩</Text>
      <Text className="text-sm text-gray-600 mb-4">This will show AI-generated curriculum plans and yearly overview.</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </ScreenWrapper>
  );
};

export default PlannerScreen;
