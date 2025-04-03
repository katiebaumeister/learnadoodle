import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

const RecordsCard = ({ record }) => {
  return (
    <View className="bg-white p-4 rounded-2xl shadow-sm mb-2">
      <Text className="font-semibold text-md">{record.title}</Text>
      <Text className="text-sm text-gray-600">{record.description || 'No description'}</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(record.pdf_url)}
        className="mt-2"
      >
        <Text className="text-blue-500 text-xs underline">Open PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordsCard;
