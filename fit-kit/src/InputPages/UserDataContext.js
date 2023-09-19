import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserDataState] = useState({
    name: '',
    gender: '',
    weight: '',
    height: '',
    age: '',
    neck: '',
    waist: '',
    hip: '',
    bmi: '',
    bodyFatPercentage: '',
    muscleMass: '',
    bodyWaterPercentage: '',
    ffmi: '',
    bmr: '',
    totalEnergyExpenditure: '',
    caloriesPerStep: '',
    totalCaloriesBurned: '',
    steps: '',
  });

  const [userTraining, setUserTrainingState] = useState({
    howOften: '',
    howLong: '',
    goal: '',
  });

  // Beim Start der App die gespeicherten Daten aus AsyncStorage laden
  useEffect(() => {
    loadUserData();
    loadUserTraining();
  }, []);

  // Funktionen zum Laden von Daten aus AsyncStorage
  const loadUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userDataFromStorage = JSON.parse(userDataJSON);
        setUserDataState(userDataFromStorage);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Benutzerdaten:', error);
    }
  };

  const loadUserTraining = async () => {
    try {
      const userTrainingJSON = await AsyncStorage.getItem('userTraining');
      if (userTrainingJSON) {
        const userTrainingFromStorage = JSON.parse(userTrainingJSON);
        setUserTrainingState(userTrainingFromStorage);
      }
    } catch (error) {
      console.error('Fehler beim Laden des Trainings:', error);
    }
  };

  // Funktionen zum Aktualisieren und Speichern der Daten
  const setUserData = async (newUserData) => {
    try {
      setUserDataState(newUserData);
      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Fehler beim Speichern der Benutzerdaten:', error);
    }
  };

  const setUserTraining = async (newUserTraining) => {
    try {
      setUserTrainingState(newUserTraining);
      await AsyncStorage.setItem('userTraining', JSON.stringify(newUserTraining));
    } catch (error) {
      console.error('Fehler beim Speichern des Trainings:', error);
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, setUserData, userTraining, setUserTraining }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
