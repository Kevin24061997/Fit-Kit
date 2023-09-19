import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage5() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Nutzen Sie useIsFocused
  const { userData, setUserData } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToInputPage6() {
    navigation.navigate('InputPage6');
  }

  const [age, setAge] = useState('');
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage6(); // Hier wird zur nächsten Seite navigiert, wenn die Seite im Fokus ist
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage5');
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
        if (userDataFromStorage.age) {
          setAge(userDataFromStorage.age);
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
      const updatedUserData = { ...userData, age: age }; // Aktualisieren Sie userData mit dem Alter
      setUserData(updatedUserData); // Setzen Sie die aktualisierten Daten im Context
      await AsyncStorage.setItem('inputStatusPage5', 'done');
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
    {!inputDone ? (
      <View>
        <Text style={styles.inputText}>Geben Sie Ihr Alter ein:</Text>
        <TextInput
          style={styles.inputField}
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Alter"
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
