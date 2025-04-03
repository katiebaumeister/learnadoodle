import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Circle } from 'react-native-progress';
import useTheme from '../hooks/useTheme';
import { getProgress } from '../services/ProgressService';
import useToast from '../hooks/useToast';

const ProgressTracker = ({ family_id }) => {
  const { colors } = useTheme();
  const toast = useToast();
  const [progressData, setProgressData] = useState({ completed_days: 0, total_days: 1 });

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await getProgress(family_id);
        setProgressData(res);
      } catch (err) {
        toast("Failed to fetch progress");
      }
    };
    fetchProgress();
  }, []);

  const { completed_days, total_days } = progressData;
  const percent = total_days > 0 ? Math.round((completed_days / total_days) * 100) : 0;

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex-row items-center space-x-4">
      <Circle
        size={60}
        progress={total_days > 0 ? completed_days / total_days : 0}
        thickness={5}
        showsText={false}
        color={colors.primary}
        unfilledColor="#E5E7EB"
        borderWidth={0}
      />
      <View>
        <Text className="font-semibold text-md text-gray-800">Year Progress</Text>
        <Text className="text-sm text-gray-600">{completed_days} / {total_days} days ({percent}%)</Text>
      </View>
    </View>
  );
};

export default ProgressTracker;
