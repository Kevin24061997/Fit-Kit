import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from '../style.js/Inputstyle';

export function InputPage0() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Nutzen Sie useIsFocused
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage1(); // Hier wird zur nächsten Seite navigiert
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage0');
      if (inputStatus === 'done') {
        setInputDone(true);
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Eingabestatus:', error);
    }
  };

  const loadInputData = async () => {
        if (inputDone) {
          navigateToInputPage1();
        }
      }
    
  
  const handleInputDone = async () => {
      if (isFocused) {
        navigateToInputPage1(); // Hier wird zur nächsten Seite navigiert, wenn die Seite im Fokus ist
      }
    } 
 

  const navigateToInputPage1 = () => {
    navigation.navigate('InputPage1');
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      {inputDone ? (
        <Text style={styles.inputText}>
          Die Eingabe wurde bereits gemacht.
        </Text>
      ) : (
        <View>
          <Text style={styles.inputText}>
                Deine Reise zu einem{'\n'}
                fitteren und gesünderen{'\n'}
                Leben beginnt hier.{'\n'}
                {'\n'}
                Wir nutzen deine eingegebenen Informationen,
                um dir den perfekten Trainingsplan zu erstellen{'\n'}
                und dich auf dem Weg zu deinen Zielen zu begleiten.{'\n'}
                {'\n'}
                Lass uns zusammen{'\n'}
                anpacken und großartige Ergebnisse erzielen!{'\n'}
                {'\n'}
          </Text>
          <Button
            title="Bereit, durchzustarten? Los geht's!"
            onPress={handleInputDone}
            style={styles.button}
          />
        </View>
      )}
    </ScrollView>

  );
}
