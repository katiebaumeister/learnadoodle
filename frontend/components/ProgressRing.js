import React from 'react';
import { View, Text } from 'react-native';

const ProgressRing = () => {
  return (
    <View className="flex items-center justify-center my-4">
      <View className="w-24 h-24 rounded-full border-4 border-purple-400 flex items-center justify-center">
        <Text className="font-semibold text-lg">75%</Text>
      </View>
      <Text className="text-xs text-gray-500 mt-1">Progress</Text>
    </View>
  );
};

export default ProgressRing;

