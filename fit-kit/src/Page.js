import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { bilderTag } from './function/Bildertag';
import { useUserData } from './InputPages/UserDataContext';

export const Page = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startOfWeek, setStartOfWeek] = useState(new Date());
  

  useEffect(() => {
    // Ermitteln Sie den aktuellen Tag der Woche (0 = Sonntag, 1 = Montag, ...)
    const currentDayOfWeek = currentDate.getDay();

    // Berechnen Sie das Datum des Beginns der aktuellen Woche (Montag)
    const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - daysToMonday);

    // Aktualisieren Sie den Start der Woche und das aktuelle Datum
    setStartOfWeek(monday);
  }, []);

  function getDayOfWeek(dayIndex) {
    // Diese Funktion gibt den Wochentag (Mo, Di, ...) für einen gegebenen Index zurück.
    const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    return daysOfWeek[dayIndex];
  }



  function navigateToInfoBlockScreen() {
    navigation.navigate('Timer');
  }

  function navigateToInfoEinstellungScreen() {
    navigation.navigate('Einstellung');
  }


  const { userTraining } = useUserData();

  // Überprüfen Sie, ob howOften im userTraining vorhanden ist und eine gültige Zahl ist
  if (!userTraining || !userTraining.howOften || isNaN(userTraining.howOften)) {
    return null; // Zeigen Sie nichts an, wenn die Eingabe ungültig ist
  }

  const howOften = parseInt(userTraining.howOften, 10); // howOften in eine Ganzzahl konvertieren

  // Erstellen Sie eine Array mit der Anzahl von Containern basierend auf howOften
  const containerArray = Array.from({ length: howOften }, (_, index) => index);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {Array.from({ length: 7 }).map((_, index) => {
          // Erstellen Sie ein Array mit 7 Tagen (0 bis 6) und mappen Sie es auf die Anzeige
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + index);

          return (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{getDayOfWeek(index)}</Text>
              <Text
                style={[
                  styles.dateText,
                  day.getDate() === currentDate.getDate() ? styles.currentDateText : null,
                ]}
              >
                {day.getDate()}
              </Text>
            </View>
          );
        })}
      </View>

      <ScrollView style={styles.infoBlockContainer}>
      {containerArray.map((_, index) => (
        <TouchableOpacity key={index} onPress={navigateToInfoBlockScreen}>
          <View style={styles.infoBlock}>
            <Image source={bilderTag.image1} style={styles.infoTagBilder} />
            <Image source={bilderTag.image2} style={styles.infoTagBilder} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>

      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={navigateToInfoEinstellungScreen}>
          <Text style={styles.sectionText}>Einstellung</Text>
        </TouchableOpacity>
        <Text style={styles.sectionText}>Training</Text>
      </View>
    </View>
  );
};
