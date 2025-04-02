import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import CalendarBar from '../components/CalendarBar';
import JoyCorner from '../components/JoyCorner';
import LearningLogger from '../components/LearningLogger';
import WeeklySummaryCard from '../components/WeeklySummaryCard';
import ProgressRing from '../components/ProgressRing';
import FloatingPlannerButton from '../components/FloatingPlannerButton';

const HomeScreen = ({ navigation }) => {
  return (
    <ScreenWrapper>
      <CalendarBar />
      <ProgressRing />
      <JoyCorner />
      <WeeklySummaryCard />
      <LearningLogger />
      <FloatingPlannerButton onPress={() => navigation.navigate('Planner')} />
    </ScreenWrapper>
  );
};

export default HomeScreen;
