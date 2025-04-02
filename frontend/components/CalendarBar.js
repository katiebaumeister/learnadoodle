import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CalendarBar = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row p-2 bg-white rounded-2xl shadow-sm mb-2">
      {days.map((day, index) => (
        <View key={index} className="items-center px-4">
          <Text className="text-xs text-gray-500">{day}</Text>
          <View className="w-6 h-6 bg-purple-200 rounded-full mt-1" />
        </View>
      ))}
    </ScrollView>
  );
};

export default CalendarBar;
