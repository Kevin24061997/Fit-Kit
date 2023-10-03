import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserData } from './UserDataContext';

import { styles } from '../style.js/Inputstyle';

export function InputPage2() {
  const navigation = useNavigation();
  const { userData, setUserData } = useUserData();
  const isFocused = useIsFocused();

  function navigateToInputPage3() {
    navigation.navigate('InputPage3');
  }

  const [gender, setGender] = useState('');
  const [inputDone, setInputDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    checkInputStatus();
    loadInputData();
  }, []);

  useEffect(() => {
    if (isFocused && inputDone) {
      navigateToInputPage3();
    }
  }, [isFocused, inputDone]);

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
          setInputDone(true);
        }
      } else {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Fehler beim Laden der Eingabedaten:', error);
    }
  };

  const handleInputDone = async (selectedGender) => {
    if (inputDone) {
      return;
    }

    try {
      const updatedUserData = { ...userData, gender: selectedGender };
      setUserData(updatedUserData);
      await AsyncStorage.setItem('inputStatusPage2', 'done');
      setInputDone(true);
    } catch (error) {
      console.error('Fehler beim Speichern des Eingabestatus:', error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setModalVisible(false);
    handleInputDone(selectedGender);
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
              <Text style={styles.inputText}>Geben Sie Ihr Geschlecht ein:</Text>
              <Text style={styles.input}>{gender}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.inputText}>Geschlecht: {gender}</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, { color: 'white' }]}>Geschlecht auswählen:</Text>
            <TouchableOpacity
              onPress={() => handleGenderSelection('Mann')}
              style={[styles.goalButton, { backgroundColor: 'darkblue' }]}
            >
              <Text style={[styles.buttonText1]}>Mann</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleGenderSelection('Frau')}
              style={[styles.goalButton, { backgroundColor: 'darkblue' }]}
            >
              <Text style={[styles.buttonText1]}>Frau</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
