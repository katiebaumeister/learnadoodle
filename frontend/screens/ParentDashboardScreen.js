import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CalendarBar from '../components/CalendarBar';
import JoyCorner from '../components/JoyCorner';
import ProgressRing from '../components/ProgressRing';
import useToast from '../hooks/useToast';
import { useNavigation } from '@react-navigation/native';

const ParentDashboardScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  return (
    <ScreenWrapper>
      <CalendarBar />
      <ProgressRing />

      <View className="mt-4 space-y-3">

        <TouchableOpacity
          onPress={() => navigation.navigate('Planner')}
          className="bg-purple-500 p-4 rounded-2xl shadow-sm"
        >
          <Text className="text-white font-semibold">Open Planner ✨</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Students')}
          className="bg-purple-500 p-4 rounded-2xl shadow-sm"
        >
          <Text className="text-white font-semibold">Manage Students 👩‍🎓</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toast('Reports section coming soon!')}
          className="bg-purple-500 p-4 rounded-2xl shadow-sm"
        >
          <Text className="text-white font-semibold">Reports 📚</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => toast('Joy Corner will soon show fun insights!')}
          className="bg-purple-500 p-4 rounded-2xl shadow-sm"
        >
          <Text className="text-white font-semibold">Joy Corner 💖</Text>
        </TouchableOpacity>

      </View>

    </ScreenWrapper>
  );
};

export default ParentDashboardScreen;
