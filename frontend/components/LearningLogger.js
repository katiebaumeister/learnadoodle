import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ButtonWithLoader from './ButtonWithLoader';
import useApi from '../hooks/useApi';
import useToast from '../hooks/useToast';

const LearningLogger = () => {
  const [log, setLog] = useState('');
  const { callApi, loading, error } = useApi();
  const toast = useToast();

  const handleLog = async () => {
    if (!log) return toast('Please enter something to log.');
    const res = await callApi('/api/log_learning', 'POST', { text: log });
    if (res) {
      toast('Logged successfully');
      setLog('');
    }
  };

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-2">
      <Text className="font-semibold text-lg mb-2">Log Learning 📝</Text>
      <TextInput
        placeholder="Describe today's lesson..."
        className="border rounded p-2 mb-2 text-sm"
        multiline
        value={log}
        onChangeText={setLog}
      />
      <ButtonWithLoader loading={loading} onPress={handleLog}>
        Save Log
      </ButtonWithLoader>
      {error && <Text className="text-red-500 mt-1">{error}</Text>}
    </View>
  );
};

export default LearningLogger;
