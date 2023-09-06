import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { TimerContext } from './TimerContext';
import * as Notifications from 'expo-notifications';

export function EinzelÜbungScreen() {
  const { timer, setTimer } = useContext(TimerContext);
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(timer.seconds || 0);
  const [isRunning] = useState(timer.isRunning || false);


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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        </View>
      ),
    });
  }, [ isRunning, seconds]);
    
  // Timer in Container ##############################

  const [time1, setTime1] = useState(120); // Zeit in Sekunden (2 Minuten = 120 Sekunden)
  const [isRunning1, setIsRunning2] = useState(false);

  useEffect(() => {
    if (isRunning1 && time1 > 0) {
      const timerInterval = setInterval(() => {
        if (time1 > 0) {
          setTime1(time1 - 1);
        } else {
          clearInterval(timerInterval);
          setIsRunning2(false);
          sendNotification(); // Timer ist abgelaufen, Benachrichtigung senden
        }
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [isRunning1, time1]);

  const startTimer = () => {
    setIsRunning2(true);
  };

  const decreaseTime = () => {
    if (time1 > 10) {
      setTime1((prevTime) => prevTime - 10);
    }
  };

  const increaseTime = () => {
    setTime1((prevTime) => prevTime + 10);
  };

  const formatTime1 = () => {
    const minutes = Math.floor(time1 / 60);
    const seconds = time1 % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimerTextClick = () => {
    // Wenn der Timer nicht läuft, starten Sie ihn
    if (!isRunning1) {
      startTimer();
    }
  };

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Timer abgelaufen',
        body: 'Das nächste Set machen!',
      },
      trigger: null, // Sofortige Auslösung der Benachrichtigung
    });
  };

  return (
    <View style={styles.infoBlockContainer}>
      <ScrollView horizontal style={{}}>
    <Image source={require('../Bilder/1.jpg')} style={{ width: 100, height: 100, marginRight: 10 }} />
    <Image source={require('../Bilder/2.jpg')} style={{ width: 100, height: 100, marginRight: 10 }} />
    <Image source={require('../Bilder/3.jpg')} style={{ width: 100, height: 100, marginRight: 10 }} />
    <Image source={require('../Bilder/4.jpg')} style={{ width: 100, height: 100, marginRight: 10 }} />
    <Image source={require('../Bilder/5.jpg')} style={{ width: 100, height: 100, marginRight: 10 }} />
    <Image source={require('../Bilder/6.jpg')} style={{ width: 100, height: 100, marginRight: 10 }} />
    <Image source={require('../Bilder/7.jpg')} style={{ width: 100, height: 100 }} />
  </ScrollView>
    <View style={styles.Wiederholungen}>
        <Image source={require('../Bilder/1.jpg')} style={{ width: 70, height: 70 }} />
        <View style={styles.timecontainer}>
          <View style={styles.timerControls}>
            <TouchableOpacity onPress={decreaseTime}>
              <Text style={styles.controlButton}>-10 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleTimerTextClick}>
            <Text style={styles.timerDisplay}>{formatTime1()}</Text>
          </TouchableOpacity>
            <TouchableOpacity onPress={increaseTime}>
              <Text style={styles.controlButton}> +10</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.sectionContainer1}>
        <TouchableOpacity onPress={null}>
          <Text style={styles.sectionText}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={null}>
          <Text style={styles.sectionText}>Gewichte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={null}>
          <Text style={styles.sectionText}>Fortschritt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

