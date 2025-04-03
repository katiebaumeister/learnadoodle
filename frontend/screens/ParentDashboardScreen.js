import React from 'react';
import { View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CalendarBar from '../components/CalendarBar';
import ProgressTracker from '../components/ProgressTracker';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const ParentDashboardScreen = () => {
  const navigation = useNavigation();
  const family_id = 1; // replace with dynamic family_id later

  return (
    <ScreenWrapper>
      <CalendarBar />

      <ProgressTracker family_id={family_id} />

      <View className="mt-4 space-y-3">

        <Button onPress={() => navigation.navigate('Planner')}>
          Open Planner ✨
        </Button>

        <Button onPress={() => navigation.navigate('Students')}>
          Manage Students 👩‍🎓
        </Button>

        <Button onPress={() => navigation.navigate('Reports')}>
          Reports 📚
        </Button>

        <Button onPress={() => navigation.navigate('JoyCorner')}>
          Joy Corner 💖
        </Button>

      </View>
    </ScreenWrapper>
  );
};

export default ParentDashboardScreen;
