import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import RecordsCard from '../components/RecordsCard';
import Button from '../components/Button';
import useToast from '../hooks/useToast';
import { getRecords, generateJournal, generateReport } from '../services/RecordsService';

const RecordsCornerScreen = () => {
  const [records, setRecords] = useState([]);
  const toast = useToast();
  const family_id = 1; // dynamic later

  const fetchRecords = async () => {
    try {
      const res = await getRecords(family_id);
      setRecords(res.records || []);
    } catch (err) {
      toast('Failed to load records');
    }
  };

  useEffect(() => { fetchRecords(); }, []);

  const handleGenerateJournal = async () => {
    toast('Generating Journal...');
    await generateJournal(family_id);
    toast('Journal Generated!');
    fetchRecords();
  };

  const handleGenerateReport = async () => {
    toast('Generating Report...');
    await generateReport(family_id);
    toast('Report Generated!');
    fetchRecords();
  };

  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg mb-4">Records Corner 📂</Text>

      <Button onPress={handleGenerateJournal}>Generate Journal</Button>
      <Button style="mt-2" onPress={handleGenerateReport}>Generate Progress Report</Button>

      <Text className="mt-4 text-gray-600 text-sm">Saved Records:</Text>

      {records.map(record => (
        <RecordsCard key={record.record_id} record={record} />
      ))}

      {records.length === 0 && <Text className="text-gray-400 text-center mt-4">No records yet.</Text>}
    </ScreenWrapper>
  );
};

export default RecordsCornerScreen;
