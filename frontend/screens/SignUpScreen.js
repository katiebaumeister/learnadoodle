import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      await AsyncStorage.setItem('firebaseToken', token);
    } catch (error) {
      console.error('Signup error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text onPress={() => navigation.navigate('SignIn')} style={styles.link}>
        Already have an account? Sign in
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, marginVertical: 10, padding: 10 },
  link: { marginTop: 10, color: 'blue', textAlign: 'center' },
});

export default SignUpScreen;
