import React, { useEffect } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function MainScreen({ navigation }) {
  useEffect(() => {
    checkIfAppStarted();
  }, []);

  const checkIfAppStarted = async () => {
    try {
      const value = await AsyncStorage.getItem('appStarted');
      if (value === null) {
        // App wird zum ersten Mal gestartet
        await AsyncStorage.setItem('appStarted', 'true'); // Markieren Sie die App als gestartet
        navigation.replace('InputPage1'); // Navigieren zur InputPage1 beim ersten Start
      } else {
        // App wurde zuvor gestartet
        navigation.replace('Training'); // Navigieren zur Training-Seite bei jedem anderen Start
      }
    } catch (error) {
      console.error('Fehler beim Lesen von AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.mainseite}>
    
    </View>
  );
}
