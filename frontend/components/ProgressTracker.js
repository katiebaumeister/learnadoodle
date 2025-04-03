import React from 'react';
import { View, Text } from 'react-native';
import { Circle } from 'react-native-progress';
import useTheme from '../hooks/useTheme';

const ProgressTracker = ({ completedDays = 0, totalDays = 180 }) => {
  const { colors } = useTheme();

  const progress = Math.min(completedDays / totalDays, 1); // Clamp between 0-1
  const percent = Math.round(progress * 100);

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex-row items-center space-x-4">
      <Circle
        size={60}
        progress={progress}
        thickness={5}
        showsText={false}
        color={colors.primary}
        unfilledColor="#E5E7EB"
        borderWidth={0}
      />
      <View>
        <Text className="font-semibold text-md text-gray-800">Year Progress</Text>
        <Text className="text-sm text-gray-600">{completedDays} / {totalDays} days completed ({percent}%)</Text>
      </View>
    </View>
  );
};

export default ProgressTracker;
