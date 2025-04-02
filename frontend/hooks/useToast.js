import { ToastAndroid, Platform, Alert } from 'react-native';

export default function useToast() {
  return (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Notice', message);
    }
  };
}
