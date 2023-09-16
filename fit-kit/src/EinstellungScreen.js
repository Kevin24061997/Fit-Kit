import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function EinstellungScreen() {
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [neck, setNeck] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  
  const [bmi, setBMI] = useState(null);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(null);
  const [muscleMass, setMuscleMass] = useState(null);
  const [bodyWaterPercentage, setBodyWaterPercentage] = useState(null);
  const [ffmi, setFFMI] = useState(null);
  const [bmr, setBMR] = useState(null);
  const [totalEnergyExpenditure, setTotalEnergyExpenditure] = useState(null); 
  const [caloriesPerStep, setCaloriesPerStep] = useState(null);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(null);
  const [steps, setsteps] = useState(null);

  useEffect(() => {
    // Beim Laden der App die zuvor gespeicherten Daten aus AsyncStorage abrufen
    loadUserData();
  }, []);

  const saveUserData = async () => {
    try {
      const userData = {
        gender,
        weight,
        height,
        age,
        neck,
        waist,
        hip,
        bmi,
        bodyFatPercentage,
        muscleMass,
        bodyWaterPercentage,
        ffmi,
        bmr,
        totalEnergyExpenditure,
        caloriesPerStep,
        totalCaloriesBurned,
        steps,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Fehler beim Speichern der Daten:', error);
    }
  };

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const parsedUserData = JSON.parse(userData);
        setGender(parsedUserData.gender);
        setWeight(parsedUserData.weight);
        setHeight(parsedUserData.height);
        setAge(parsedUserData.age);
        setNeck(parsedUserData.neck);
        setWaist(parsedUserData.waist);
        setHip(parsedUserData.hip);
        setBMI(parsedUserData.bmi);
        setBodyFatPercentage(parsedUserData.bodyFatPercentage);
        setMuscleMass(parsedUserData.muscleMass);
        setBodyWaterPercentage(parsedUserData.bodyWaterPercentage);
        setFFMI(parsedUserData.ffmi);
        setBMR(parsedUserData.bmr);
        setTotalEnergyExpenditure(parsedUserData.totalEnergyExpenditure);
        setCaloriesPerStep(parsedUserData.caloriesPerStep);
        setTotalCaloriesBurned(parsedUserData.totalCaloriesBurned);
        setsteps(parsedUserData.steps);
      }
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
    }
  };

  const calculateCaloriesBurned = () => {
    const isMale = gender.toLowerCase() === 'male';
    const weightKg = parseFloat(weight);
    let speedKmph;
  
    if (isMale) {
      speedKmph = 5; // Annahme: Durchschnittsgeschwindigkeit für Männer: 5 km/h
    } else {
      speedKmph = 4; // Annahme: Durchschnittsgeschwindigkeit für Frauen: 4 km/h
    }
  
    // Umrechnung der Geschwindigkeit in Meter pro Sekunde (m/s) und Berechnung der Kalorien pro Schritt
    const meterToSekunde = (speedKmph * 1000) / 3600;
    const caloriesPerStep = (meterToSekunde / 1000) * weightKg;; // Kalorien pro Schritt in Metern pro Sekunde umgerechnet
  
    setCaloriesPerStep(caloriesPerStep.toFixed(2));
  
    const totalCalories = caloriesPerStep * parseFloat(steps);
    setTotalCaloriesBurned(totalCalories.toFixed(2));
  };
  
  
  

  const calculateBMI = () => {
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100; // Umrechnung von cm in Meter
    const bmiValue = weightKg / (heightM * heightM);
    setBMI(bmiValue.toFixed(2));
  };

  function estimateBodyFatPercentage(gender, neck, waist, hip, height) {
  const isMale = gender === 'Male';
  const savedNeck = parseFloat(neck);
  const savedWaist = parseFloat(waist);
  const savedHip = parseFloat(hip);
  const savedHeight = parseFloat(height);

  if (isMale) { // Änderung hier: Prüfe, ob isMale true ist
    const bodyFatPercentage =
      86.010 * Math.log10(savedWaist - savedNeck) -
      70.041 * Math.log10(savedHeight) +
      36.76;
    return bodyFatPercentage.toFixed(2);
  } else if (!isMale) { // Änderung hier: Prüfe, ob isMale false ist
    const bodyFatPercentage =
      163.205 * Math.log10(savedWaist + savedHip - savedNeck) -
      97.684 * Math.log10(savedHeight) -
      78.387;
    return bodyFatPercentage.toFixed(2);
  } else {
    console.log("Ungültiges Geschlecht angegeben.");
    return null;
  }
}

  const calculateLeanMass = () => {
    const weightKg = parseFloat(weight);
    const bodyFatPercentageValue = parseFloat(bodyFatPercentage) / 100;
    const leanMassValue = weightKg * (1 - bodyFatPercentageValue);
    setMuscleMass(leanMassValue.toFixed(2));
  };

  const calculateFFMI = () => {
    const leanMassValue = parseFloat(muscleMass);
    const heightM = parseFloat(height) / 100; // Umrechnung von cm in Meter
    const ffmiValue = (leanMassValue / (heightM * heightM)) + 6.1 * (1.8 - heightM);
    setFFMI(ffmiValue.toFixed(2));
  };

  const calculateBMR = () => {
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);
    const isMale = gender === 'Male'; // Annahme: 'Male' oder 'female'
    
    if (isMale) {
      const bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
      setBMR(bmrValue.toFixed(2));
    } else {
      const bmrValue = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
      setBMR(bmrValue.toFixed(2));
    }
  };

  const calculateTotalEnergyExpenditure = () => {
    const bmrValue = parseFloat(bmr);
    const activityFactor = 1.375; // Beispielaktivitätsfaktor für leichte Aktivität
    const totalEnergyExpenditureValue = bmrValue * activityFactor;
    setTotalEnergyExpenditure(totalEnergyExpenditureValue.toFixed(2));
  };


  const estimateMuscleMass = () => {
    const weightKg = parseFloat(weight);
    const bodyFatPercentageValue = parseFloat(bodyFatPercentage) / 100;
    const muscleMassValue = weightKg * (1 - bodyFatPercentageValue);
    setMuscleMass(muscleMassValue.toFixed(2));
  };

  const estimateBodyWaterPercentage = () => {
    const weightKg = parseFloat(weight);
    const ageYears = parseFloat(age);
    const bodyHigh = parseFloat(height)
    const isMale = gender === 'Male'; // Annahme: 'Male' oder 'female'
    
    let bodyWaterPercentage;

    if (isMale) {
      bodyWaterPercentage = 2.447 - (0.09156 * ageYears) + (0.1074 * bodyHigh) + (0.3362 * weightKg);
    } else {
      bodyWaterPercentage = 2.097 - (0.1069 * ageYears) + (0.2466 * bodyHigh) + (0.3315 * weightKg);
    }
    setBodyWaterPercentage(bodyWaterPercentage.toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Geschlecht:</Text>
      <TextInput
        value={gender}
        onChangeText={(text) => setGender(text)}
        placeholder="Geschlecht (Male/female)"
      />
      <Text>Gewicht (in kg):</Text>
      <TextInput
        value={weight}
        onChangeText={(text) => setWeight(text)}
        placeholder="Gewicht"
        keyboardType="numeric"
      />
      <Text>Körpergröße (in cm):</Text>
      <TextInput
        value={height}
        onChangeText={(text) => setHeight(text)}
        placeholder="Körpergröße"
        keyboardType="numeric"
      />
      <Text>Alter:</Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        placeholder="Alter"
        keyboardType="numeric"
      />
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
      <Text>Wie viele Schritte heute:</Text>
      <TextInput
        value={steps}
        onChangeText={(text) => setsteps(text)}
        placeholder="3000"
        keyboardType="numeric"
      />
      <Button title="Berechnen" onPress={() => {
        if (gender === 'Male' || gender === 'female') {
          estimateBodyFatPercentage();
          calculateBMI();
          calculateLeanMass();
          calculateFFMI();
          calculateBMR();
          calculateTotalEnergyExpenditure();
          estimateMuscleMass();
          estimateBodyWaterPercentage();
          calculateCaloriesBurned();
          saveUserData();
        } else {
          console.error('Ungültiges Geschlecht angegeben.');
        }
      }} />

      {bmi !== null && (
        <View>
          <Text>BMI:</Text>
          <Text>{bmi}</Text>
        </View>
      )}

      {bodyFatPercentage !== null && (
        <View>
          <Text>Geschätzter Körperfettanteil (%):</Text>
          <Text>{bodyFatPercentage}</Text>
        </View>
      )}

      {muscleMass !== null && (
        <View>
          <Text>Geschätzte Muskelmasse (kg):</Text>
          <Text>{muscleMass}</Text>
        </View>
      )}

      {bodyWaterPercentage !== null && (
        <View>
          <Text>Geschätzter Körperwasseranteil (%):</Text>
          <Text>{bodyWaterPercentage}</Text>
        </View>
      )}

      {ffmi !== null && (
        <View>
          <Text>FFMI:</Text>
          <Text>{ffmi}</Text>
        </View>
      )}

      {bmr !== null && (
        <View>
          <Text>BMR:</Text>
          <Text>{bmr}</Text>
        </View>
      )}

      {totalEnergyExpenditure !== null && (
        <View>
          <Text>Gesamter Energieverbrauch:</Text>
          <Text>{totalEnergyExpenditure}</Text>
        </View>
      )}

      {totalCaloriesBurned !== null && (
        <View>
          <Text>Kalorien Schritte:</Text>
          <Text>{totalCaloriesBurned}</Text>
        </View>
      )}
    </ScrollView>
  );
}
