import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage9() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { userData, setUserData, userTraining, setUserTraining } = useUserData();

  function navigateToPage() {
    navigation.navigate('Training');
  }

  const [goal, setGoal] = useState('');
  const [inputDone, setInputDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleInputDone = async (selectedGoal) => {
    if (!isValidGoal(selectedGoal)) {
      return;
    }

    try {
      setUserTraining({
        ...userTraining,
        goal: selectedGoal,
      });

      await AsyncStorage.setItem('inputStatusPage9', 'done');
      await AsyncStorage.setItem('goal', selectedGoal);

      setInputDone(true);
      setModalVisible(false);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleTrainingGoalSelection = (selectedGoal) => {
    handleInputDone(selectedGoal); // Automatically save the selected goal and mark input as done
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.inputContainer}>
      {!inputDone ? (
        <View>
          <TouchableOpacity onPress={showModal}>
            <View style={styles.column}>
              <Text style={styles.inputText}>Welches Trainingsziel verfolgen Sie?</Text>
              <Text style={styles.input}>{goal}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, { color: 'white' }]}>Trainingsziel auswählen:</Text>
            <TouchableOpacity
              onPress={() => handleTrainingGoalSelection('Hautstraffung')}
              style={[styles.goalButton, { backgroundColor: 'darkblue' }]}
            >
              <Text style={[styles.buttonText1]}>Hautstraffung</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTrainingGoalSelection('Fettverlust')}
              style={[styles.goalButton, { backgroundColor: 'darkblue' }]}
            >
              <Text style={[styles.buttonText1]}>Fettverlust</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTrainingGoalSelection('Muskelaufbau')}
              style={[styles.goalButton, { backgroundColor: 'darkblue' }]}
            >
              <Text style={[styles.buttonText1]}>Muskelaufbau</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
