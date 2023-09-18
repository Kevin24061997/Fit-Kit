import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Komponente für die erste Eingabeseite
export function InputPage1() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [inputDone, setInputDone] = useState(false);

  function navigateToInputPage2() {
    navigation.navigate('InputPage2');
  }

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

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
      const savedName = await AsyncStorage.getItem('name');
      if (savedName) {
        setName(savedName);
        navigateToInputPage2();
      }
    } catch (error) {
      console.error('Fehler beim Laden der Eingabedaten:', error);
    }
  };

  const handleInputDone = async () => {
    try {
      await AsyncStorage.setItem('inputStatusPage1', 'done');
      await AsyncStorage.setItem('name', name); // Eingabe speichern
      setInputDone(true);
      navigateToInputPage2();
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {inputDone ? (
        <Text>Die Eingabe wurde bereits gemacht.</Text>
      ) : (
        <View>
          <Text>Seite 1 - Geben Sie Ihren Namen ein:</Text>
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