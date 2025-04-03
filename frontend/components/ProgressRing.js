import React from 'react';
import { View, Text } from 'react-native';
import { MotiProgress } from 'moti';
import useTheme from '../hooks/useTheme';

const ProgressRing = ({ progress = 0.45 }) => { // Default to 45% for now
  const { colors } = useTheme();

  return (
    <View className="items-center justify-center mt-4 mb-6">
      <MotiProgress
        size={120}
        strokeWidth={8}
        progress={progress}
        color={colors.primary}
        backgroundColor={colors.secondary}
      />
      <View className="absolute items-center justify-center">
        <Text className="text-lg font-semibold">{`${Math.round(progress * 100)}%`}</Text>
        <Text className="text-xs text-gray-500">School Year</Text>
      </View>
    </View>
  );
};

export default ProgressRing;
