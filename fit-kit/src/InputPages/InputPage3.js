import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage3() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Nutzen Sie useIsFocused
  const { userData, setUserData } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToInputPage4() {
    navigation.navigate('InputPage4');
  }

  const [weight, setWeight] = useState('');
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage4(); // Hier wird zur nächsten Seite navigiert, wenn die Seite im Fokus ist
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage3');
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
        if (userDataFromStorage.weight) {
          setWeight(userDataFromStorage.weight);
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
    try {
      const updatedUserData = { ...userData, weight: weight }; // Aktualisieren Sie userData mit dem Gewicht
      setUserData(updatedUserData); // Setzen Sie die aktualisierten Daten im Context
      await AsyncStorage.setItem('inputStatusPage3', 'done');
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
    {!inputDone ? (
      <View>
        <Text style={styles.inputText}>Geben Sie Ihr Gewicht ein:</Text>
        <TextInput
          style={styles.inputField}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          placeholder="Gewicht"
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
