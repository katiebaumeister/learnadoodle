import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';
import axios from 'axios';

const API = "http://localhost:8000"; // Change to your Render URL when deployed

export default function StudentsScreen() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', age: '', grade_base: '', interests: '' });
    const [familyId, setFamilyId] = useState(1); // TODO: dynamically load

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        const res = await axios.post(`${API}/api/fetch_snapshot`, { family_id: familyId });
        setStudents(res.data.students);
    };

    const addStudent = async () => {
        await axios.post(`${API}/api/add_student`, {
            family_id: familyId,
            student: newStudent
        });
        setNewStudent({ name: '', age: '', grade_base: '', interests: '' });
        fetchStudents();
    };

    const removeStudent = async (student_id) => {
        Alert.alert("Confirm", "Remove this student?", [
            { text: "Cancel" },
            { text: "Yes", onPress: async () => {
                await axios.post(`${API}/api/remove_student`, { student_id });
                fetchStudents();
            }}
        ]);
    };

    const triggerPlanner = async () => {
        const res = await axios.post(`${API}/api/trigger_planner`, { family_id: familyId });
        Alert.alert("Planner AI", res.data.ai_reply);
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>Student Panel</Text>

            <Text>Add New Student:</Text>
            <TextInput placeholder="Name" value={newStudent.name} onChangeText={v => setNewStudent({ ...newStudent, name: v })} />
            <TextInput placeholder="Age" value={newStudent.age} onChangeText={v => setNewStudent({ ...newStudent, age: v })} />
            <TextInput placeholder="Grade" value={newStudent.grade_base} onChangeText={v => setNewStudent({ ...newStudent, grade_base: v })} />
            <TextInput placeholder="Interests" value={newStudent.interests} onChangeText={v => setNewStudent({ ...newStudent, interests: v })} />
            <Button title="Add Student" onPress={addStudent} />

            <Text style={{ marginTop: 20, fontSize: 20 }}>Current Students</Text>
            {students.map(s => (
                <View key={s.student_id} style={{ marginBottom: 10, borderBottomWidth: 1 }}>
                    <Text>{s.name} (Age: {s.age}, Grade: {s.grade_base})</Text>
                    <Text>Interests: {s.interests}</Text>
                    <Button title="Remove" onPress={() => removeStudent(s.student_id)} />
                </View>
            ))}

            <Button title="Trigger Planner AI" onPress={triggerPlanner} color="#4CAF50" />
        </ScrollView>
    );
}
