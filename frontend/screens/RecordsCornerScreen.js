import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import RecordsCard from '../components/RecordsCard';
import useToast from '../hooks/useToast';
import { getRecords } from '../services/RecordsService';

const RecordsCornerScreen = () => {
  const [records, setRecords] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await getRecords(1); // dynamic family_id later
        setRecords(res.records || []);
      } catch (err) {
        toast('Failed to load records');
      }
    };
    fetchRecords();
  }, []);

  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg mb-4">Records Corner 📂</Text>
      <FlatList
        data={records}
        keyExtractor={(item) => item.record_id.toString()}
        renderItem={({ item }) => <RecordsCard record={item} />}
      />
      {records.length === 0 && <Text className="text-gray-400 text-center mt-4">No records yet.</Text>}
    </ScreenWrapper>
  );
};

export default RecordsCornerScreen;
