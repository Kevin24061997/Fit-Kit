import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext'; // Importieren Sie den Context

export function InputPage2() {
  const navigation = useNavigation();
  const { userData, setUserData } = useUserData(); // Verwenden Sie den UserDataContext

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
    if (inputDone) {
      navigateToInputPage3();
    }
  }, [inputDone]);

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
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!inputDone ? (
        <View>
          <Text>Geben Sie Ihr Geschlecht ein:</Text>
          <TextInput
            value={gender}
            onChangeText={(text) => setGender(text)}
            placeholder="Geschlecht (Mann/Frau)"
          />
          <Button title="Eingabe beenden" onPress={handleInputDone} />
        </View>
      ) : null}
    </ScrollView>
  );
}
