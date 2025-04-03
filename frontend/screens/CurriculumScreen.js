import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import { getCurriculum } from '../services/PlannerService';
import { TextInput, Alert, TouchableOpacity } from 'react-native';


const CurriculumScreen = () => {
  const [curriculum, setCurriculum] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getCurriculum();
      setCurriculum(res.curriculum);
    };
    fetch();
  }, []);

  return (
    <ScreenWrapper>
      <Text className="text-xl font-bold mb-4">📘 Explore Curriculum</Text>
      <ScrollView>
        {curriculum.map((block, idx) => (
          <View key={idx} className="mb-6">
            <Text className="text-lg font-bold text-indigo-700 mb-2">{block.student}</Text>

            {block.subjects.map((subject, i) => (
              <View key={i} className="mb-4 border-b pb-3 border-gray-200">
                <Text className="font-semibold text-base mb-1">📖 {subject.subject}</Text>
                <Text className="text-sm text-gray-600 mb-2">
                  {subject.objectives || 'No objectives yet.'}
                </Text>
                <View className="pl-2">
                  {subject.units?.map((u, j) => (
                    <Text key={j} className="text-sm text-gray-800 mb-1">
                      • {u.unit}: {u.description}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CurriculumScreen;
