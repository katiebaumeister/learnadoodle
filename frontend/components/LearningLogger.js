import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LearningLogger = () => {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-2">
      <Text className="font-semibold text-lg mb-2">Log Learning 📝</Text>
      <TextInput
        placeholder="Describe today's lesson..."
        className="border rounded p-2 mb-2 text-sm"
      />
      <Button title="Save" onPress={() => alert("Saved! (connect to API later)")} />
    </View>
  );
};

export default LearningLogger;

