import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage4() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Nutzen Sie useIsFocused
  const { userData, setUserData } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToInputPage5() {
    navigation.navigate('InputPage5');
  }

  const [height, setHeight] = useState('');
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage5(); // Hier wird zur nächsten Seite navigiert, wenn die Seite im Fokus ist
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage4');
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
        if (userDataFromStorage.height) {
          setHeight(userDataFromStorage.height);
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
      const updatedUserData = { ...userData, height: height }; // Aktualisieren Sie userData mit der Körpergröße
      setUserData(updatedUserData); // Setzen Sie die aktualisierten Daten im Context
      await AsyncStorage.setItem('inputStatusPage4', 'done');
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      {!inputDone ? (
        <View>
          <Text style={styles.inputText}>Geben Sie Ihre Körpergröße ein:</Text>
          <TextInput
            style={styles.inputField}
            value={height}
            onChangeText={(text) => setHeight(text)}
            placeholder="Körpergröße"
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
