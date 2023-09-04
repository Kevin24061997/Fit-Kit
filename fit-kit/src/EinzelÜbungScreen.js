import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { TimerContext } from '../App';

// Einzel Übung #########################################################
export function EinzelÜbungScreen() {
  const { timer, setTimer } = useContext(TimerContext);
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(timer.seconds || 0);
  const [isRunning, setIsRunning] = useState(timer.isRunning || false);

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
              setIsRunning(false);
              setTimer({ seconds, isRunning: false });
            },
          },
        ]
      );
    } else {
      setIsRunning(true);
      setTimer({ seconds, isRunning: true });
    }
  };

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

  return (
    <View>
      <Text>Übung</Text>
      {/* Weitere Inhalte für den Einstellung-Bildschirm */}
    </View>
  );
}
