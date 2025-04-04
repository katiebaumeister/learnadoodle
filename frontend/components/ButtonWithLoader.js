import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

const ButtonWithLoader = ({ onPress, loading, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading}>
      {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#A78BFA',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default ButtonWithLoader;
