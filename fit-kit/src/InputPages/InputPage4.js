import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function InputPage4() {
  const navigation = useNavigation();

  function navigateToInputPage5() {
    navigation.navigate('InputPage5');
  }

  const [name, setName] = useState('');
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (inputDone) {
      navigateToInputPage5(); // Hier rufe ich die Funktion auf, um zur Training-Seite zu navigieren
    }
  }, [inputDone]);

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
      const savedName = await AsyncStorage.getItem('name');
      if (savedName) {
        setName(savedName);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Eingabedaten:', error);
    }
  };

  const handleInputDone = async () => {
    try {
      await AsyncStorage.setItem('inputStatusPage4', 'done');
      await AsyncStorage.setItem('name', name); // Eingabe speichern
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!inputDone ? (
        <View>
          <Text>Seite 2 - Geben Sie Ihren Namen ein:</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Name"
          />
          <Button title="Eingabe beenden" onPress={handleInputDone} />
        </View>
      ) : null}
    </ScrollView>
  );
}
