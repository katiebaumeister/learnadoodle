import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import useToast from '../hooks/useToast';
import { getJoySuggestions } from '../services/JoyService';

const JoyCornerScreen = () => {
  const [suggestions, setSuggestions] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchJoy = async () => {
      try {
        const res = await getJoySuggestions(1); // family_id dynamic later
        setSuggestions(res.activities || []);
      } catch (err) {
        toast('Failed to fetch activities');
      }
    };
    fetchJoy();
  }, []);

  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg mb-4">Joy Corner ✨</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-3 shadow-sm mb-2">
            <Text className="text-sm text-gray-800">{item}</Text>
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default JoyCornerScreen;
