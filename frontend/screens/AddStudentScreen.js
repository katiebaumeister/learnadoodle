import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import useStudents from '../hooks/useStudents';
import useToast from '../hooks/useToast';

const AddStudentScreen = ({ navigation }) => {
  const family_id = 1; // dynamic later
  const { add, loading, error } = useStudents(family_id);
  const toast = useToast();

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [age, setAge] = useState('');

  const handleAdd = async () => {
    if (!name) return toast('Please enter a student name');
    await add({ name, grade_base: grade, age });
    toast('Student added!');
    navigation.goBack();
  };

  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg mb-4">Add Student ➕</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} className="border rounded p-2 mb-2" />
      <TextInput placeholder="Grade" value={grade} onChangeText={setGrade} className="border rounded p-2 mb-2" />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" className="border rounded p-2 mb-4" />

      <Button loading={loading} onPress={handleAdd}>
        Save Student
      </Button>

      {error && <Text className="text-red-500 mt-2">{error}</Text>}
    </ScreenWrapper>
  );
};

export default AddStudentScreen;
