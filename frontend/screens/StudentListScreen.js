import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import ButtonWithLoader from '../components/ButtonWithLoader';
import useStudents from '../hooks/useStudents';
import useToast from '../hooks/useToast';

const StudentListScreen = ({ navigation }) => {
  const family_id = 1; // Replace later with dynamic family_id from auth
  const { students, loadStudents, remove, loading, error } = useStudents(family_id);
  const toast = useToast();

  useEffect(() => {
    loadStudents();
  }, []);

  const handleRemove = async (student_id) => {
    await remove(student_id);
    toast('Student removed!');
  };

  return (
    <ScreenWrapper>
      <Text className="font-bold text-lg mb-4">Your Students 👩‍🎓</Text>

      <ButtonWithLoader loading={loading} onPress={() => navigation.navigate('AddStudent')}>
        Add Student
      </ButtonWithLoader>

      {error && <Text className="text-red-500 mt-2">{error}</Text>}

      <FlatList
        data={students}
        keyExtractor={(item) => item.student_id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-2xl mb-2 shadow-sm">
            <Text className="font-semibold text-md">{item.name}</Text>
            <Text className="text-sm text-gray-600">Grade: {item.grade_base || 'N/A'}</Text>
            <Text className="text-sm text-gray-600">Age: {item.age || 'N/A'}</Text>
            <TouchableOpacity onPress={() => handleRemove(item.student_id)} className="mt-2">
              <Text className="text-red-500 text-xs">Remove Student</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScreenWrapper>
  );
};

export default StudentListScreen;
