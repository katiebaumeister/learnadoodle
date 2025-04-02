import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const ReportScreen = () => {
  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg">Reports 📚</Text>
      <Text className="text-sm text-gray-600 mt-2">This is where progress reports and transcripts will appear.</Text>
    </ScreenWrapper>
  );
};

export default ReportScreen;
