import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { TimerContext } from './TimerContext';

// Timer ##################################################################
export function TimerHeader() {
  const navigation = useNavigation();
  const { timer, setTimer } = useContext(TimerContext);
  const [seconds, setSeconds] = useState(timer.seconds || 0);
  const [isRunning, setIsRunning] = useState(timer.isRunning || false);
  const [übungsBlöcke, setÜbungsBlöcke] = useState([
    'Übung',
    'Übung',
    'Übung',
    'Übung',
    'Übung',
    'Übung',
    'Übung',
  ]);

  useEffect(() => {
    let timer;

    if (isRunning) {
      setTimeout(() => {
        timer = setInterval(() => {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    setTimer({ seconds, isRunning: true });
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimer({ seconds, isRunning: false });
  };

  const handleTimerButtonPress = () => {
    if (isRunning) {
      Alert.alert(
        'Training beenden?',
        'Sind Sie sicher, dass Sie das Training beenden möchten?',
        [
          {
            text: 'nein',
            onPress: () => { },
          },
          {
            text: 'ja',
            style: 'cancel',
            onPress: () => {
              stopTimer();
            },
          },
        ]
      );
    } else {
      startTimer();
    }
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    setTimer({ seconds, isRunning });

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, seconds, setTimer]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title={isRunning ? 'Stop' : 'Starten'} onPress={handleTimerButtonPress} />
      ),
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      ),
    });
  }, [navigation, handleTimerButtonPress, isRunning, seconds]);

  const navigateToEinzelÜbung = () => {
    navigation.navigate('EinzelÜbung');
  };

  const addÜbungsBlock = () => {
    // Hier füge einen neuen Übungsblock hinzu, z.B. "Übung X"
    const newÜbungsBlöcke = [...übungsBlöcke, `Übung`];
    setÜbungsBlöcke(newÜbungsBlöcke);
  };

  const removeÜbungsBlock = () => {
    // Hier entferne den letzten Übungsblock
    if (übungsBlöcke.length > 0) {
      const newÜbungsBlöcke = übungsBlöcke.slice(0, übungsBlöcke.length - 1);
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };

  // Funktion, um eine Zahl in das Format "00" zu konvertieren
  const formatNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  // Funktion zur Umwandlung der Sekunden in "00:00:00" Format
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
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
