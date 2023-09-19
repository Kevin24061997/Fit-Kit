// UserDataContext.js
import React, { createContext, useContext, useState } from 'react';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({
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

  const [userTraining, setUserTraining] = useState({
    howOften: '',
    howLong: '',
    goal: '',
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData, userTraining, setUserTraining }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
