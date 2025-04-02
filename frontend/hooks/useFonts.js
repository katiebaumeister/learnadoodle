import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export default function useFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Nunito-Regular': require('../assets/fonts/Nunito-Regular.ttf'),
        'Nunito-SemiBold': require('../assets/fonts/Nunito-SemiBold.ttf'),
        'Nunito-Bold': require('../assets/fonts/Nunito-Bold.ttf'),
      });
      setLoaded(true);
    }
    loadFonts();
  }, []);

  return loaded;
}

