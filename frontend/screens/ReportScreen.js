import React from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

const ReportScreen = () => {
  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg">Reports 📚</Text>
      <Text className="text-sm text-gray-600 mt-2">This is where AI-generated progress reports and transcripts will show up.</Text>
      <Text className="text-xs text-gray-400 mt-2">The planner AI will soon feed here automatically.</Text>
    </ScreenWrapper>
  );
};

export default ReportScreen;
