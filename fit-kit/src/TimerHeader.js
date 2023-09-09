import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { HeaderTimer } from './function/HeaderTimer';

// Timer ##################################################################
export function TimerHeader() {
  const navigation = useNavigation();
  const [übungsBlöcke, setÜbungsBlöcke] = useState([
    'Übung',
    'Übung',
    'Übung',
    'Übung',
    'Übung',
    'Übung',
    'Übung',
  ]);
  
  HeaderTimer(navigation, true);
  
  const navigateToEinzelÜbung = () => {
    navigation.navigate('EinzelÜbung');
  };

  const addÜbungsBlock = () => {
    if (übungsBlöcke.length < 9) {
      // Hier füge einen neuen Übungsblock hinzu, z.B. "Übung X"
      const newÜbungsBlöcke = [...übungsBlöcke, `Übung ${übungsBlöcke.length + 1}`];
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };
  
  const removeÜbungsBlock = () => {
    if (übungsBlöcke.length > 0) {
      // Hier entferne den letzten Übungsblock
      const newÜbungsBlöcke = übungsBlöcke.slice(0, übungsBlöcke.length - 1);
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };


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
      <TouchableOpacity onPress={navigateToEinzelÜbung}>
        {übungsBlöcke.map((übungsBlock, index) => (
          <View style={styles.ÜbungsBlock} key={index}>
            <Text style={styles.infoText}>{`${index + 1}: ${übungsBlock}`}</Text>
          </View>
        ))}
      </TouchableOpacity>
    </ScrollView>
  );
}



