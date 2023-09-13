import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { HeaderTimer } from './function/HeaderTimer';
import { Bilder } from './function/Bilder';


export function TimerHeader() {
  const navigation = useNavigation();
  const [übungsBlöcke, setÜbungsBlöcke] = useState([
    'Übung ',
    'Übung ',
    'Übung ',
    'Übung ',
    'Übung ',
    'Übung ',
    'Übung ',
  ]);

  HeaderTimer(navigation, true);

  const addÜbungsBlock = () => {
    if (übungsBlöcke.length < 9) {
      const newÜbungsBlöcke = [...übungsBlöcke, `Übung ${übungsBlöcke.length + 1}`];
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };

  const removeÜbungsBlock = () => {
    if (übungsBlöcke.length > 0) {
      const newÜbungsBlöcke = übungsBlöcke.slice(0, übungsBlöcke.length - 1);
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };

  const images = Bilder;

  return (
    <ScrollView style={styles.ÜbungsBlockContainer}>
      <View style={styles.buttonContainer1}>
        <Text style={styles.buttonText1} onPress={addÜbungsBlock}>
          Hinzufügen
        </Text>
        <Text style={styles.buttonText1} onPress={removeÜbungsBlock}>
          Entfernen
        </Text>
      </View>
      {übungsBlöcke.map((übungsBlock, index) => (
        <TouchableOpacity
          key={index}
          style={styles.ÜbungsBlock}
          onPress={() => navigation.navigate('EinzelÜbung', { selectedImageIndex: index, images })}>
          <Image
            source={images[index].primaryImage} // Verwenden Sie das Bild aus der Bilder-Datei basierend auf dem Index
            style={{
              width: 120,
              height: 120,
              borderRadius: 10,
              padding: 10,
              marginTop: 5,
            }}
          />
          <Text style={styles.infoText}>{`${index + 1}: ${übungsBlock}`}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
