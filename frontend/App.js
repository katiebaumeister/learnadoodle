import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import PlannerScreen from './screens/PlannerScreen';
import StudentListScreen from './screens/StudentListScreen';
import AddStudentScreen from './screens/AddStudentScreen';
import useFonts from './hooks/useFonts';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
  const fontsLoaded = useFonts();
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Planner" component={PlannerScreen} />
        <Stack.Screen name="Students" component={StudentListScreen} />
        <Stack.Screen name="AddStudent" component={AddStudentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
