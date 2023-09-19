import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage9() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userData, setUserData, userTraining, setUserTraining } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToPage() {
    navigation.navigate('Training');
  }

  const [goal, setGoal] = useState('');
  const [inputDone, setInputDone] = useState(false);

  useEffect(() => {
    checkInputStatus();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
        navigateToPage();
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage9');
      if (inputStatus === 'done') {
        setInputDone(true);
      }
    } catch (error) {
      console.error('Fehler beim Überprüfen des Eingabestatus:', error);
    }
  };

  const isValidGoal = (input) => {
    const validGoals = ['Hautstraffung', 'Fettverlust', 'Muskelaufbau'];
    return validGoals.includes(input);
  };

  const handleInputDone = async () => {
    if (!isValidGoal(goal)) {
      alert('Ungültiges Trainingsziel. Bitte geben Sie eines der folgenden Ziele ein: Hautstraffung, Fettverlust, Muskelaufbau.');
      return;
    }

    try {
      // Speichern Sie das Trainingsziel im Context
      setUserTraining({
        ...userTraining,
        goal,
      });

      await AsyncStorage.setItem('inputStatusPage9', 'done');
      await AsyncStorage.setItem('goal', goal);

      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      {!inputDone ? (
        <View>
          <Text style={styles.inputText}>Welches Trainingsziel verfolgen Sie?</Text>
          <TextInput
            style={styles.inputField}
            value={goal}
            onChangeText={(text) => setGoal(text)}
            placeholder="Trainingsziel (Hautstraffung, Fettverlust, Muskelaufbau)"
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
