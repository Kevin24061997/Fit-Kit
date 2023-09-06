import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { styles } from '../styles';
import { TimerContext } from '../TimerContext';

export function HeaderTimer(navigation, stopButtonAvailable) {
  const { timer, setTimer } = useContext(TimerContext);
  const [seconds, setSeconds] = useState(timer.seconds || 0);
  const [isRunning, setIsRunning] = useState(timer.isRunning || false);

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

  // Zeigt Header mit oder ohne Stop-Button an.
  if(stopButtonAvailable){
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
  }
  else{
    useEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          </View>
        ),
      });
    }, [navigation, isRunning, seconds]);
  }
  

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
  return navigation;
}
