import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { schedulePushNotification } from './function/PushUp';
import { HeaderTimer } from './function/HeaderTimer';

export function EinzelÜbungScreen() {
  const navigation = useNavigation();
  
  HeaderTimer(navigation, false);
    
  // Timer in Container ##############################

  const [time1, setTime1] = useState(120); // Zeit in Sekunden (2 Minuten = 120 Sekunden)
  const [isRunning1, setIsRunning2] = useState(false);

  useEffect(() => {
    if (isRunning1) {
      const timerInterval = setInterval(() => {
        if (time1 > 0) {
          setTime1(time1 - 1);
        } else {
          schedulePushNotification();
          setTime1(120);
          setIsRunning2(false)
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

  // liste und Modal#############################

  const initialData = ['01', '02', '03', '04', '05']; // Zweistellige Zahlen
  const [list1, setList1] = useState(initialData);
  const [list2, setList2] = useState(initialData);
  const [checkboxList1, setCheckboxList1] = useState([false, false, false, false, false]);
  const [checkboxList2, setCheckboxList2] = useState([false, false, false, false, false]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleCheck1 = (index) => {
    const newCheckboxList = [...checkboxList1];
    newCheckboxList[index] = !newCheckboxList[index];
    setCheckboxList1(newCheckboxList);
    setModalVisible(true); // Öffnet das Modal beim Klicken auf die Checkbox
  };

  const handleCheck2 = (index) => {
    const newCheckboxList = [...checkboxList2];
    newCheckboxList[index] = !newCheckboxList[index];
    setCheckboxList2(newCheckboxList);
    setModalVisible(true); // Öffnet das Modal beim Klicken auf die Checkbox
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setModalVisible(false);
  };

  const handleDelete = () => {
    // Löscht einen Eintrag aus allen Listen
    if (list1.length > 0 && list2.length > 0) {
      const newList1 = [...list1];
      const newList2 = [...list2];
      const newCheckboxList1 = [...checkboxList1];
      const newCheckboxList2 = [...checkboxList2];

      newList1.pop(); // Entfernt den letzten Eintrag aus Liste 1
      newList2.pop(); // Entfernt den letzten Eintrag aus Liste 2
      newCheckboxList1.pop(); // Entfernt den letzten Eintrag aus Checkbox-Liste 1
      newCheckboxList2.pop(); // Entfernt den letzten Eintrag aus Checkbox-Liste 2

      setList1(newList1);
      setList2(newList2);
      setCheckboxList1(newCheckboxList1);
      setCheckboxList2(newCheckboxList2);
    }
  };

  const handleAdd = () => {
    if (list1.length < 6) { // Überprüfung, ob die maximale Anzahl von Einträgen erreicht ist
      // Fügt einen Eintrag in alle Listen hinzu
      const newItem = (parseInt(list1[list1.length - 1]) + 1).toString(); // Erzeugt eine neue Zahl
      const newList1 = [...list1, newItem];
      const newList2 = [...list2, newItem];
      const newCheckboxList1 = [...checkboxList1, false];
      const newCheckboxList2 = [...checkboxList2, false];
  
      setList1(newList1);
      setList2(newList2);
      setCheckboxList1(newCheckboxList1);
      setCheckboxList2(newCheckboxList2);
    } else {
      // Hier können Sie eine Benachrichtigung anzeigen oder andere Maßnahmen ergreifen,
      // um dem Benutzer mitzuteilen, dass die maximale Anzahl von Einträgen erreicht ist.
    }
  };

  return (
    <View style={styles.infoBlockContainer}>
      <ScrollView horizontal style={{}}>
    <Image source={require('../Bilder/1.jpg')} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }} />
    <Image source={require('../Bilder/2.jpg')} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }} />
    <Image source={require('../Bilder/3.jpg')} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }} />
    <Image source={require('../Bilder/4.jpg')} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }} />
    <Image source={require('../Bilder/5.jpg')} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }} />
    <Image source={require('../Bilder/6.jpg')} style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }} />
    <Image source={require('../Bilder/7.jpg')} style={{ width: 100, height: 100, borderRadius: 10 }} />
  </ScrollView>
    <View style={styles.container1 }>
        <Image source={require('../Bilder/1.jpg')} style={{ width: 70, height: 70, borderRadius: 10 }} />
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
      
      <View style={styles.content1}>
        <View style={styles.listContainer1}>
          <Text style={styles.headerText1}>Wiederholung</Text>
          <FlatList
            data={list1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.listItem1}>
                <Text style={styles.indexText1}>{index + 1}</Text>
                <Text style={styles.itemText1}>{item}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.xContainer}>
          <FlatList
            data={Array(list1.length + 1).fill('X')}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.xListItem}>
                <Text style={[styles.xText, index === 0 && styles.invisible]}>{item}</Text>
              </View>
            )}
          />
        </View>
        <View style={styles.listContainer1}>
          <Text style={styles.headerText1}>KG pro Seite</Text>
          <FlatList
            data={list2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.listItem1}>
                <Text style={styles.itemText1}>{item}</Text>
                <TouchableOpacity
                  onPress={() => handleCheck2(index)}
                  style={[styles.checkbox1, checkboxList2[index] && styles.checkedCheckbox1]}
                >
                  {checkboxList2[index] && <Text>X</Text>}
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
      
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <View style={[styles.modalContainer,]}>
          <View style={styles.modalContent}>
            <Text style={[styles.modalText, { color: 'white' }]}>Wie schwer war die Übung?</Text>
            <TouchableOpacity
              onPress={() => handleDifficultySelect('leicht')}
              style={[styles.difficultyButton, { backgroundColor: 'green' }]}
            >
              <Text style={[styles.buttonText1, { color: 'black' }]}>Leicht</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDifficultySelect('mäßig')}
              style={[styles.difficultyButton, { backgroundColor: 'yellowgreen' }]}
            >
              <Text style={[styles.buttonText1, { color: 'black' }]}>Mäßig</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDifficultySelect('mittel')}
              style={[styles.difficultyButton, { backgroundColor: 'yellow' }]}
            >
              <Text style={[styles.buttonText1, { color: 'black' }]}>Mittel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDifficultySelect('anstrengend')}
              style={[styles.difficultyButton, { backgroundColor: 'orange' }]}
            >
              <Text style={[styles.buttonText1, { color: 'black' }]}>Schwer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleDifficultySelect('schwer')}
              style={[styles.difficultyButton, { backgroundColor: 'red' }]}
            >
              <Text style={[styles.buttonText1, { color: 'black' }]}>Anstrengend</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonsContainer1}>
        <TouchableOpacity onPress={handleDelete} style={styles.button1}>
          <Text style={styles.buttonText1}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd} style={styles.button1}>
          <Text style={styles.buttonText1}>+</Text>
        </TouchableOpacity>
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