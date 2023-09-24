import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';


function GewichtUndWiederholungen({ closeModal }) {
  const [maximaleWiederholung, setMaximaleWiederholung] = useState('0');
  const [maximalesGewicht, setMaximalesGewicht] = useState('0');
  const navigation = useNavigation();

  const handleMaximaleWiederholungChange = (text) => {
    setMaximaleWiederholung(text);
    setMaximalesGewicht('0');
  };

  const handleMaximalesGewichtChange = (text) => {
    setMaximalesGewicht(text);
    setMaximaleWiederholung('0');
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
          <Button
            title="Schließen"
            onPress={() => {
              // Parameter an den EinzelÜbungScreen übergeben
              navigation.navigate('EinzelÜbung', {
                maximaleWiederholung,
                maximalesGewicht,
              });
              closeModal(); // Schließen des aktuellen Modals
            }}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default GewichtUndWiederholungen;
