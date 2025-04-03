import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CustomTooltip = ({ handleNext, handlePrev, handleStop, isFirstStep, isLastStep, currentStep }) => {
  return (
    <View className="bg-[#F8F4FF] p-4 rounded-2xl w-full max-w-sm shadow-xl">
      <Text className="text-lg font-semibold text-indigo-600 mb-2">
        {currentStep.name?.toUpperCase()}
      </Text>
      <Text className="text-gray-800 mb-4">{currentStep.text}</Text>

      <View className="flex-row justify-between">
        {!isFirstStep ? (
          <TouchableOpacity onPress={handlePrev}>
            <Text className="text-indigo-500 font-medium">Back</Text>
          </TouchableOpacity>
        ) : <View />}
        {!isLastStep ? (
          <TouchableOpacity onPress={handleNext}>
            <Text className="text-indigo-700 font-bold">Next ➤</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStop}>
            <Text className="text-pink-500 font-bold">Finish 🎉</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTooltip;
