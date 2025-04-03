import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Button from '../components/Button';
import {
  getCurriculum,
  curriculumToMarkdown,
  exportMarkdownToPDF,
} from '../services/PlannerService';
import apiClient from '../services/apiClient';
import { toast } from '../hooks/useToast';

const CurriculumScreen = () => {
  const [curriculum, setCurriculum] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getCurriculum();
        setCurriculum(res.curriculum);
      } catch (err) {
        console.error('Error fetching curriculum:', err);
        Alert.alert('Error', 'Unable to load curriculum data.');
      }
    };
    fetch();
  }, []);

  const editSubjectObjective = (student, subject, current) => {
    let updatedText = current || '';
    Alert.prompt(
      `Edit Objectives for ${subject}`,
      `Update the goal for ${student}'s ${subject} course.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: async (newText) => {
            try {
              await apiClient('/api/update_subject_objective', 'POST', {
                student,
                subject,
                objectives: newText,
              });
              toast('✏️ Objectives updated!');
            } catch {
              Alert.alert('Error', 'Could not save changes.');
            }
          },
        },
      ],
      'plain-text',
      updatedText
    );
  };

  const handleExport = async () => {
    try {
      const res = await getCurriculum();
      const markdown = curriculumToMarkdown(res.curriculum);
      await exportMarkdownToPDF(markdown, 'Learnadoodle-Curriculum');
      toast('📄 Curriculum exported as PDF');
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not export PDF');
    }
  };

  return (
    <ScreenWrapper>
      <Text className="text-xl font-bold mb-4">📘 Explore Curriculum</Text>

      <ScrollView>
        {curriculum.map((block, idx) => (
          <View key={idx} className="mb-6">
            <Text className="text-lg font-bold text-indigo-700 mb-2">
              {block.student}
            </Text>

            {block.subjects.map((subject, i) => (
              <View
                key={i}
                className="mb-4 border-b pb-3 border-gray-200"
              >
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="font-semibold text-base">
                    📖 {subject.subject}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      editSubjectObjective(
                        block.student,
                        subject.subject,
                        subject.objectives
                      )
                    }
                  >
                    <Text className="text-xs text-indigo-500">Edit</Text>
                  </TouchableOpacity>
                </View>

                <Text className="text-sm text-gray-600 mb-2">
                  {subject.objectives || 'No objectives yet.'}
                </Text>

                <View className="pl-2">
                  {subject.units?.map((u, j) => (
                    <Text
                      key={j}
                      className="text-sm text-gray-800 mb-1"
                    >
                      • {u.unit}: {u.description}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <Button className="mt-4" onPress={handleExport}>
        📤 Export Curriculum Plan
      </Button>
    </ScreenWrapper>
  );
};

export default CurriculumScreen;
