import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage2() {
  const navigation = useNavigation();
  const { userData, setUserData } = useUserData(); // Verwenden Sie den UserDataContext
  const isFocused = useIsFocused(); // Nutzen Sie useIsFocused

  function navigateToInputPage3() {
    navigation.navigate('InputPage3');
  }

  const [gender, setGender] = useState('');
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage3(); // Hier wird zur nächsten Seite navigiert, wenn die Seite im Fokus ist
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage2');
      if (inputStatus === 'done') {
        setInputDone(true);
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Eingabestatus:', error);
    }
  };

  const loadInputData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userDataFromStorage = JSON.parse(userDataJSON);
        if (userDataFromStorage.gender) {
          setGender(userDataFromStorage.gender);
        }
      } else {
        // Wenn userData nicht vorhanden ist, initialisieren Sie es mit Anfangswerten
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Fehler beim Laden der Eingabedaten:', error);
    }
  };

  const handleInputDone = async () => {
    // Validierung sicherstellen, dass nur "Mann" oder "Frau" eingegeben werden kann
    if (gender !== 'Mann' && gender !== 'Frau') {
      Alert.alert('Ungültiges Geschlecht', 'Bitte geben Sie entweder "Mann" oder "Frau" ein.');
      return;
    }

    try {
      const updatedUserData = { ...userData, gender: gender }; // Aktualisieren Sie userData mit dem Geschlecht
      setUserData(updatedUserData); // Setzen Sie die aktualisierten Daten im Context
      await AsyncStorage.setItem('inputStatusPage2', 'done');
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      {!inputDone ? (
        <View>
          <Text style={styles.inputText}>Geben Sie Ihr Geschlecht ein:</Text>
          <TextInput
            style={styles.inputField}
            value={gender}
            onChangeText={(text) => setGender(text)}
            placeholder="Geschlecht (Mann/Frau)"
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
