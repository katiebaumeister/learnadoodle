import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import RecordsCornerScreen from '../screens/RecordsCornerScreen';
import ParentDashboardScreen from '../screens/ParentDashboardScreen';
import PlannerScreen from '../screens/PlannerScreen';
import StudentListScreen from '../screens/StudentListScreen';
import JoyCornerScreen from '../screens/JoyCornerScreen';
import ReportScreen from '../screens/ReportScreen';
import CurriculumScreen from '../screens/CurriculumScreen'; // ✅ Add this line

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 24,
          height: 60,
          backgroundColor: '#fff',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 10,
          elevation: 5,
        },
        tabBarActiveTintColor: '#A78BFA',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          fontSize: 11,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={ParentDashboardScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Planner"
        component={PlannerScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          tabBarLabel: 'Planner',
        }}
      />
      <Tab.Screen
        name="Students"
        component={StudentListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          tabBarLabel: 'Students',
        }}
      />
      <Tab.Screen
        name="JoyCorner"
        component={JoyCornerScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles-outline" size={size} color={color} />,
          tabBarLabel: 'Joy',
        }}
      />
      <Tab.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
          tabBarLabel: 'Reports',
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsCornerScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="folder-outline" size={size} color={color} />,
          tabBarLabel: 'Records',
        }}
      />
      <Tab.Screen
        name="Curriculum"
        component={CurriculumScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="book-outline" size={size} color={color} />,
          tabBarLabel: 'Curriculum',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
