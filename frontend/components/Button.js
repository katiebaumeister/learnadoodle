import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import useTheme from '../hooks/useTheme';

const Button = ({ onPress, loading, children, disabled = false, style = '' }) => {
  const { base } = useTheme();

  return (
    <TouchableOpacity
      onPress={loading || disabled ? null : onPress}
      className={`${base.button} ${disabled ? 'opacity-50' : ''} ${style}`}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className={base.buttonText}>{children}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
