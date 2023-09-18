import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext'; // Importieren Sie den Context

export function InputPage3() {
  const navigation = useNavigation();
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
    if (inputDone) {
      navigateToInputPage4(); // Hier rufe ich die Funktion auf, um zur nächsten Seite zu navigieren
    }
  }, [inputDone]);

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
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!inputDone ? (
        <View>
          <Text>Geben Sie Ihr Gewicht ein:</Text>
          <TextInput
            value={weight}
            onChangeText={(text) => setWeight(text)}
            placeholder="Gewicht"
            keyboardType="numeric"
          />
          <Button title="Eingabe beenden" onPress={handleInputDone} />
        </View>
      ) : null}
    </ScrollView>
  );
}
