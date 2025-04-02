import React from 'react';
import { View, Text } from 'react-native';

const WeeklySummaryCard = () => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-2">
      <Text className="font-semibold text-lg mb-2">Weekly Summary 📆</Text>
      <Text className="text-sm text-gray-600">This week's lessons and progress will appear here as we integrate Planner AI output.</Text>
    </View>
  );
};

export default WeeklySummaryCard;
