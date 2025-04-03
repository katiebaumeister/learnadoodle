import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { copilot, CopilotStep, walkthroughable } from 'react-native-copilot';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TourModal from '../components/TourModal';
import Button from '../components/Button';
import ProgressTracker from '../components/ProgressTracker';
import RecordsCard from '../components/RecordsCard';
import WeeklySummaryCard from '../components/WeeklySummaryCard';
import JoyCorner from '../components/JoyCorner';
import FloatingPlannerButton from '../components/FloatingPlannerButton';
import CustomTooltip from '../components/CustomTooltip';

const WalkthroughableView = walkthroughable(View);

const ParentDashboardScreen = ({ start, copilotEvents }) => {
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const checkTourStatus = async () => {
      const dismissed = await AsyncStorage.getItem('tourDismissed');
      if (!dismissed) setShowTour(true);
    };
    checkTourStatus();
  }, []);

  const handleStartTour = async () => {
    setShowTour(false);
    await AsyncStorage.setItem('tourDismissed', 'true');
    start(); // starts the copilot tour
  };

  const handleSkipTour = async () => {
    await AsyncStorage.setItem('tourDismissed', 'true');
    setShowTour(false);
  };

  return (
    <>
      <TourModal visible={showTour} onStart={handleStartTour} onSkip={handleSkipTour} />

      <ScrollView className="p-4">
        <CopilotStep text="Track weekly learning progress across subjects." order={1} name="progress">
          <WalkthroughableView>
            <ProgressTracker />
          </WalkthroughableView>
        </CopilotStep>

        <CopilotStep text="Check what’s planned for this week." order={2} name="weekly-summary">
          <WalkthroughableView className="mt-6">
            <WeeklySummaryCard />
          </WalkthroughableView>
        </CopilotStep>

        <CopilotStep text="Explore fun or shared learning moments here." order={3} name="joy-corner">
          <WalkthroughableView className="mt-6">
            <JoyCorner />
          </WalkthroughableView>
        </CopilotStep>

        <CopilotStep text="Manage student records, journals, and reports." order={4} name="records">
          <WalkthroughableView className="mt-6">
            <RecordsCard />
          </WalkthroughableView>
        </CopilotStep>

        <TouchableOpacity
          className="mt-6"
          onPress={async () => {
            await AsyncStorage.removeItem('tourDismissed');
            start();
          }}
        >
          <Text className="text-sm text-indigo-400 text-center">Restart Tour</Text>
        </TouchableOpacity>
      </ScrollView>

      <CopilotStep text="Tap to launch your AI-powered planner." order={5} name="planner-button">
        <WalkthroughableView>
          <FloatingPlannerButton />
        </WalkthroughableView>
      </CopilotStep>
    </>
  );
};

export default copilot({
  overlay: 'svg',
  animated: true,
  tooltipComponent: CustomTooltip,
  tooltipStyle: {
    backgroundColor: '#F8F4FF',
    borderRadius: 20,
    padding: 14,
  },
  stepNumberComponent: () => null,
})(ParentDashboardScreen);
