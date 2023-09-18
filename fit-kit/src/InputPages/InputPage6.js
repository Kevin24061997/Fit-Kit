import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext'; // Importieren Sie den Context

export function InputPage6() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userData, setUserData } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToPage() {
    navigation.navigate('Training');
  }

  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [inputDone, setInputDone] = useState(false);
  const [gender, setGender] = useState('');

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToPage();
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage6');
      if (inputStatus === 'done') {
        setInputDone(true);
      }
      const savedGender = await AsyncStorage.getItem('gender');
      setGender(savedGender);
    } catch (error) {
      console.error('Fehler beim Überprüfen des Eingabestatus:', error);
    }
  };

  const loadInputData = async () => {
    try {
      const savedNeck = await AsyncStorage.getItem('neck');
      const savedWaist = await AsyncStorage.getItem('waist');
      const savedHip = await AsyncStorage.getItem('hip');

      if (savedNeck && savedWaist && savedHip) {
        setNeck(savedNeck);
        setWaist(savedWaist);
        setHip(savedHip);
      } else {
        // Standardwerte basierend auf dem Geschlecht, falls nichts eingegeben wurde
        if (userData.gender === 'Mann') {
          setNeck('40');
          setWaist('86');
          setHip('100');
        } else if (userData.gender === 'Frau') {
          setNeck('35');
          setWaist('73');
          setHip('96');
        }
      }
    } catch (error) {
      console.error('Fehler beim Laden der Eingabedaten:', error);
    }
  };

  const handleInputDone = async () => {
    try {
      const updatedUserData = {
        ...userData,
        neck,
        waist,
        hip,
      }; // Aktualisieren Sie userData mit den neuen Werten
      setUserData(updatedUserData); // Setzen Sie die aktualisierten Daten im Context
      await AsyncStorage.setItem('inputStatusPage6', 'done');
      await AsyncStorage.setItem('neck', neck);
      await AsyncStorage.setItem('waist', waist);
      await AsyncStorage.setItem('hip', hip);
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!inputDone ? (
        <View>
          <Text>Nackenumfang (in cm):</Text>
          <TextInput
            value={neck}
            onChangeText={(text) => setNeck(text)}
            placeholder="Nackenumfang"
            keyboardType="numeric"
          />
          <Text>Taillenumfang (in cm):</Text>
          <TextInput
            value={waist}
            onChangeText={(text) => setWaist(text)}
            placeholder="Taillenumfang"
            keyboardType="numeric"
          />
          <Text>Hüftumfang (in cm):</Text>
          <TextInput
            value={hip}
            onChangeText={(text) => setHip(text)}
            placeholder="Hüftumfang"
            keyboardType="numeric"
          />
          <Button title="Eingabe beenden" onPress={handleInputDone} />
        </View>
      ) : null}
    </ScrollView>
  );
}
