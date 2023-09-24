import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from './styles';
import { useUserData } from './InputPages/UserDataContext';

function GewichtUndWiederholungen({ closeModal }) {
  const [maximaleWiederholung, setMaximaleWiederholung] = useState('0');
  const [maximalesGewicht, setMaximalesGewicht] = useState('0');
  const { userTraining } = useUserData(); // Stellen Sie sicher, dass Sie den User Context korrekt importiert haben

  const handleMaximaleWiederholungChange = (text) => {
    setMaximaleWiederholung(text);
    setMaximalesGewicht('0');
  };

  const handleMaximalesGewichtChange = (text) => {
    setMaximalesGewicht(text);
    setMaximaleWiederholung('0');
  };

  useEffect(() => {
    loadTrainingData();
  }, []);

  const loadTrainingData = () => {
    // Laden Sie das ausgewählte Ziel aus dem Benutzerkontext
    const selectedGoal = userTraining.goal;

    // Setzen Sie die Werte basierend auf dem ausgewählten Ziel
    if (selectedGoal === 'Hautstraffung') {
      // Logik für Hautstraffung
      // Setzen Sie hier die gewünschten Werte für list1 und list2
    } else if (selectedGoal === 'Fettverlust') {
      // Logik für Fettverlust
      // Setzen Sie hier die gewünschten Werte für list1 und list2
    } else if (selectedGoal === 'Muskelaufbau') {
      // Logik für Muskelaufbau
      // Setzen Sie hier die gewünschten Werte für list1 und list2
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalText, { color: 'white' }]}>
            Maximale Wiederholung:
          </Text>
          <Text style={styles.inputDescription}>
            (Die maximale Anzahl von Wiederholungen, die du ausführen kannst,
            falls keine Gewichte verfügbar sind z.B. Liegestütze...)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleMaximaleWiederholungChange}
            value={maximaleWiederholung}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="silver"
          />

          <Text style={[styles.modalText, { color: 'white' }]}>
            Maximales Gewicht: 
          </Text>
          <Text style={styles.inputDescription}>
            (Das höchste Gewicht, das du einmal sauber ausführen kannst)
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={handleMaximalesGewichtChange}
            value={maximalesGewicht}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="silver"
          />

          <Button title="Schließen" onPress={closeModal} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default GewichtUndWiederholungen;
