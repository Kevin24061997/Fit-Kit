import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext'; // Importieren Sie den Context

export function InputPage7() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userTraining, setUserTraining } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToInputPage8() {
    navigation.navigate('InputPage8');
  }
  
  const [inputDone, setInputDone] = useState(false);
  const [howOften, setHowOften] = useState('');

  useEffect(() => {
    checkInputStatus();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage8();
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage7');
      if (inputStatus === 'done') {
        setInputDone(true);
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Eingabestatus:', error);
    }
  };

  const handleInputDone = async () => {
    try {
      // Speichern Sie Trainingsinformationen im Context
      setUserTraining({
        ...userTraining,
        howOften,
      });

      await AsyncStorage.setItem('inputStatusPage7', 'done');
      await AsyncStorage.setItem('howOften', howOften);

      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!inputDone ? (
        <View>
          <Text>Wie oft können Sie in der Woche trainieren?</Text>
          <TextInput
            value={howOften}
            onChangeText={(text) => setHowOften(text)}
            placeholder="Häufigkeit pro Woche"
            keyboardType="numeric"
          />
          <Button title="Eingabe beenden" onPress={handleInputDone} />
        </View>
      ) : null}
    </ScrollView>
  );
}
