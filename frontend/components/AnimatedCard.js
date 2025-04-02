import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

const AnimatedCard = ({ title, description }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      className="bg-white rounded-2xl p-4 shadow-sm mb-2"
    >
      <Text className="font-semibold text-lg">{title}</Text>
      <Text className="text-sm text-gray-600 mt-1">{description}</Text>
    </MotiView>
  );
};

export default AnimatedCard;
