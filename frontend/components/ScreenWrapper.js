import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

const ScreenWrapper = ({ children }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
