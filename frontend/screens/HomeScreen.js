// frontend/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CalendarBar from '../components/CalendarBar';
import JoyCorner from '../components/JoyCorner';
import LearningLogger from '../components/LearningLogger';
import WeeklySummaryCard from '../components/WeeklySummaryCard';
import ProgressRing from '../components/ProgressRing';
import FloatingPlannerButton from '../components/FloatingPlannerButton';
import { api } from '../utils/api';

const HomeScreen = ({ navigation }) => {
  const [familyData, setFamilyData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api('/get_curriculum_and_journal');
        setFamilyData(data);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError(err.message);
      }
    };

    loadData();
  }, []);

  return (
    <ScreenWrapper>
      <CalendarBar />
      <ProgressRing />
      <JoyCorner />
      <WeeklySummaryCard />
      <LearningLogger />
      <FloatingPlannerButton onPress={() => navigation.navigate('Planner')} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {familyData && (
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>
            Welcome, {familyData.family}!
          </Text>
          <Text>Students: {familyData.students?.length}</Text>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default HomeScreen;
