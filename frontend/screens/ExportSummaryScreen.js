import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, Alert
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import apiClient from '../services/apiClient';
import { exportMarkdownToPDF } from '../services/PlannerService';
import { Picker } from '@react-native-picker/picker';
import { toast } from '../hooks/useToast';

const ExportSummaryScreen = () => {
  const [data, setData] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await apiClient('/api/get_curriculum_and_journal');
        setData(res);
        if (res.students?.length > 0) {
          setSelectedStudent(res.students[0].student);
        }
      } catch (err) {
        Alert.alert('Error', 'Unable to load data');
      }
    };
    fetch();
  }, []);

  const handleExport = async () => {
    try {
      const studentData = data.students.find(s => s.student === selectedStudent);
      const markdown = generateFullMarkdown(data, studentData);
      await exportMarkdownToPDF(markdown, `${selectedStudent}-Learnadoodle`);
      toast('📄 Summary PDF exported!');
    } catch (err) {
      Alert.alert('Error', 'Export failed');
    }
  };

  if (!data) return <ScreenWrapper><Text>Loading...</Text></ScreenWrapper>;

  return (
    <ScreenWrapper>
      <Text className="text-xl font-bold mb-4">📤 Export Homeschool Summary</Text>

      <Text className="mb-2">Select Student:</Text>
      <View className="border rounded-md mb-4">
        <Picker
          selectedValue={selectedStudent}
          onValueChange={(item) => setSelectedStudent(item)}
        >
          {data.students.map((s) => (
            <Picker.Item label={s.student} value={s.student} key={s.student} />
          ))}
        </Picker>
      </View>

      <Button onPress={handleExport}>📄 Export Summary PDF</Button>
    </ScreenWrapper>
  );
};

export default ExportSummaryScreen;
