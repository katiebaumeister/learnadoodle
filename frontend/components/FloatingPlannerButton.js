import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const FloatingPlannerButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-purple-500 p-4 rounded-full absolute bottom-8 right-8 shadow-lg"
    >
      <Text className="text-white font-semibold">Planner</Text>
    </TouchableOpacity>
  );
};

export default FloatingPlannerButton;
