import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './navigation/MainTabs';
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
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="AddStudent" component={AddStudentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
