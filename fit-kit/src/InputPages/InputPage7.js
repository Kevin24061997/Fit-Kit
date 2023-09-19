import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage7() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userTraining, setUserTraining } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToInputPage8() {
    navigation.navigate('InputPage8');
  }

  const [inputDone, setInputDone] = useState(false);
  const [howOften, setHowOften] = useState('');

  useEffect(() => {
    checkInputStatus();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage8();
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage7');
      if (inputStatus === 'done') {
        setInputDone(true);
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Eingabestatus:', error);
    }
  };

  const handleInputDone = async () => {
    // Validieren Sie, ob howOften eine Zahl zwischen 1 und 7 ist
    const parsedHowOften = parseInt(howOften, 10);
    if (isNaN(parsedHowOften) || parsedHowOften < 1 || parsedHowOften > 7) {
      console.error('Ungültige Eingabe für "Wie oft können Sie in der Woche trainieren?"');
      // Zeigen Sie dem Benutzer eine Fehlermeldung an, wenn die Eingabe ungültig ist
      return;
    }
  
    try {
      // Speichern Sie Trainingsinformationen im Context
      setUserTraining({
        ...userTraining,
        howOften: parsedHowOften.toString(), // In String konvertieren und speichern
      });
  
      await AsyncStorage.setItem('inputStatusPage7', 'done');
      await AsyncStorage.setItem('howOften', parsedHowOften.toString()); // In String konvertieren und speichern
  
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      {!inputDone ? (
        <View>
          <Text style={styles.inputText}>Wie oft können Sie in der Woche trainieren?</Text>
          <TextInput
            style={styles.inputField}
            value={howOften}
            onChangeText={(text) => setHowOften(text)}
            placeholder="Häufigkeit pro Woche"
            keyboardType="numeric"
            placeholderTextColor="white"
          />
          <Button
            title="Eingabe beenden"
            onPress={handleInputDone}
            style={styles.button}
          />
        </View>
      ) : null}
    </ScrollView>
  );
}
