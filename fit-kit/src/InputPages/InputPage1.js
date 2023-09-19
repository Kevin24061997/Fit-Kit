import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext'; // Importieren Sie den Context

export function InputPage1() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Nutzen Sie useIsFocused
  const { userData, setUserData } = useUserData(); // Verwenden Sie den UserDataContext
  const [name, setName] = useState('');
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage2(); // Hier wird zur nächsten Seite navigiert
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage1');
      if (inputStatus === 'done') {
        setInputDone(true);
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Eingabestatus:', error);
    }
  };

  const loadInputData = async () => {
    try {
      // Die folgenden Zeilen wurden aktualisiert, um die Daten aus dem UserDataContext zu laden
      if (userData.name) {
        setName(userData.name);
        if (inputDone) {
          navigateToInputPage2();
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Eingabedaten:', error);
    }
  };
  
  const handleInputDone = async () => {
    try {
      const updatedUserData = { ...userData, name: name }; // Aktualisieren Sie userData mit dem Namen
      setUserData(updatedUserData); // Setzen Sie die aktualisierten Daten im Context
      await AsyncStorage.setItem('inputStatusPage1', 'done');
      setInputDone(true);
      if (isFocused) {
        navigateToInputPage2(); // Hier wird zur nächsten Seite navigiert, wenn die Seite im Fokus ist
      }
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  const navigateToInputPage2 = () => {
    navigation.navigate('InputPage2');
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {inputDone ? (
        <Text>Die Eingabe wurde bereits gemacht.</Text>
      ) : (
        <View>
          <Text>Geben Sie Ihren Namen ein:</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
          />
          <Button title="Eingabe beenden" onPress={handleInputDone} />
        </View>
      )}
    </ScrollView>
  );
}
