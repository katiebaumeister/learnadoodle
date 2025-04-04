import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import CalendarBar from '../components/CalendarBar';
import JoyCorner from '../components/JoyCorner';
import LearningLogger from '../components/LearningLogger';
import WeeklySummaryCard from '../components/WeeklySummaryCard';
import ProgressRing from '../components/ProgressRing';
import FloatingPlannerButton from '../components/FloatingPlannerButton';
import { API_URL } from '../constants';

const HomeScreen = ({ navigation }) => {
  const [familyData, setFamilyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // You can replace the token with one from Firebase auth
        const token = "YOUR_FIREBASE_TOKEN"; // You'll want to dynamically fetch this
        const response = await axios.get(`${API_URL}/get_curriculum_and_journal`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFamilyData(response.data);
      } catch (error) {
        console.error("Failed to fetch family data", error);
        Alert.alert("Error", "Failed to load data from server");
      }
    };

    fetchData();
  }, []);

  return (
    <ScreenWrapper>
      <CalendarBar />
      <ProgressRing />
      <JoyCorner />
      <WeeklySummaryCard familyData={familyData} />
      <LearningLogger />
      <FloatingPlannerButton onPress={() => navigation.navigate('Planner')} />
    </ScreenWrapper>
  );
};

export default HomeScreen;
