import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage8() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userData, setUserData, userTraining, setUserTraining } = useUserData(); // Verwenden Sie den UserDataContext

  function navigateToInputPage9() {
    navigation.navigate('InputPage9');
  }

  const [inputDone, setInputDone] = useState(false);
  const [howLong, setHowLong] = useState('');

  useEffect(() => {
    checkInputStatus();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
        navigateToInputPage9();
    }
  }, [isFocused, inputDone]);

  const checkInputStatus = async () => {
    try {
      const inputStatus = await AsyncStorage.getItem('inputStatusPage8');
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
        howLong,
      });

      await AsyncStorage.setItem('inputStatusPage8', 'done');
      await AsyncStorage.setItem('howLong', howLong);

      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      {!inputDone ? (
        <View>
          <Text style={styles.inputText}>Wie lange können Sie pro Trainingseinheit trainieren?</Text>
          <TextInput
            style={styles.inputField}
            value={howLong}
            onChangeText={(text) => setHowLong(text)}
            placeholder="Dauer pro Trainingseinheit (in Minuten)"
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
