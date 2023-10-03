import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Button, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Importieren Sie Ihre benutzerdefinierten Funktionen und Stile
import { styles } from './styles';
import { HeaderTimer } from './function/HeaderTimer';
import { PushTimer } from './function/PushTimer';
import { Bilder } from './function/Bilder';
import { DifficultyModal } from './Modal/DifficultyModal';
import { InfoModal } from './Modal/InfoModal';
import { Speichern } from './function/Speichern';
import { initialImageContents } from './function/imageData';
import { useRoute } from '@react-navigation/native';
import GewichtUndWiederholungen from './GewichtUndWiederholungen';
import { useUserData } from './InputPages/UserDataContext';

export function EinzelÜbungScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedImageIndex, setSelectedImageIndex] = useState(route.params.selectedImageIndex);
  const { maximaleWiederholung, maximalesGewicht } = route.params;

  const { saveImageContentsToStorage, loadImageContentsFromStorage, updateInitialImageContents } = Speichern();
  const saveData = async (updatedImageContents) => {
    setImageContents(updatedImageContents);
    await saveImageContentsToStorage(updatedImageContents);
  };

  useEffect(() => {
    async function initializeData() {
      const loadedData = await loadImageContentsFromStorage();
      if (loadedData) {
        setImageContents(loadedData);
      }
    }
    initializeData();
  }, []);
  

  HeaderTimer(navigation, false);

  const { startTimer, decreaseTime, handleTimerTextClick, formatTime1, increaseTime } = PushTimer();

  const images = Bilder;

  const [imageContents, setImageContents] = useState(initialImageContents);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setModalVisible(false);
    startTimer();
  };

  const handleDelete = () => {
    if (
      imageContents &&
      imageContents[selectedImageIndex] &&
      imageContents[selectedImageIndex].list1 &&
      imageContents[selectedImageIndex].list2 &&
      imageContents[selectedImageIndex].list1.length > 1 &&
      imageContents[selectedImageIndex].list2.length > 0
    ) {
      const newList1 = [...imageContents[selectedImageIndex].list1];
      const newList2 = [...imageContents[selectedImageIndex].list2];
      const newCheckboxList2 = [...imageContents[selectedImageIndex].checkboxList2];
  
      newList1.pop();
      newList2.pop();
      newCheckboxList2.pop();
  
      const updatedImageContents = [...imageContents];
      updatedImageContents[selectedImageIndex].list1 = newList1;
      updatedImageContents[selectedImageIndex].list2 = newList2;
      updatedImageContents[selectedImageIndex].checkboxList2 = newCheckboxList2;
  
      saveData(updatedImageContents);
    }
  };
  
  

  const handleCheck2 = (index) => {
    const newCheckboxList2 = [...imageContents[selectedImageIndex].checkboxList2];
    newCheckboxList2[index] = !newCheckboxList2[index];

    const updatedImageContents = [...imageContents];
    updatedImageContents[selectedImageIndex].checkboxList2 = newCheckboxList2;

    saveData(updatedImageContents);
    setModalVisible(true);
  };

  const [infoVisible, setInfoVisible] = useState(false);

  const handleInfoClose = () => {
    setInfoVisible(false);
  };

  const InfoTouch = () => {
    setInfoVisible(true)
  }

  const handleAdd = () => {
    if (
      imageContents &&
      imageContents[selectedImageIndex] &&
      imageContents[selectedImageIndex].list1 &&
      imageContents[selectedImageIndex].list2 &&
      imageContents[selectedImageIndex].list1.length < 6
    ) {
      const lastItemIndex = imageContents[selectedImageIndex].list1.length - 1;
  
      if (lastItemIndex >= 0) {
        const lastItem1 = imageContents[selectedImageIndex].list1[lastItemIndex];
        const lastItem2 = imageContents[selectedImageIndex].list2[lastItemIndex];
  
        const newList1 = [...imageContents[selectedImageIndex].list1, lastItem1];
        const newList2 = [...imageContents[selectedImageIndex].list2, lastItem2];
        const newCheckboxList2 = [
          ...imageContents[selectedImageIndex].checkboxList2,
          false,
        ];
  
        const updatedImageContents = [...imageContents];
        updatedImageContents[selectedImageIndex].list1 = newList1;
        updatedImageContents[selectedImageIndex].list2 = newList2;
        updatedImageContents[selectedImageIndex].checkboxList2 = newCheckboxList2;
  
        saveData(updatedImageContents);
      }
    }
  };
  
  

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    if (!imageContents[index].modalVisible) {
      openModal(index);

      const updatedImageContents = [...imageContents];
      updatedImageContents[index].modalVisible = true;
      setImageContents(updatedImageContents);
    
      generateTrainingLists(selectedImageIndex);
      saveData(updatedImageContents);
    }
  };
  
  useEffect(() => {
    if (imageContents && imageContents[selectedImageIndex]) {
      const updatedImageContents = [...imageContents];
      
      if (!updatedImageContents[selectedImageIndex].modalVisible) {
        openModal(selectedImageIndex);
        updatedImageContents[selectedImageIndex].modalVisible = true;
        generateTrainingLists(selectedImageIndex);
        loadImageContentsFromStorage();
      }
    }
  }, [imageContents]);
  
  const [modalVisiblef, setModalVisiblef] = useState(false);
  
  const openModal = (index) => {
    setSelectedImageIndex(index);
    
    // Überprüfen, ob modalVisiblef auf false gesetzt ist
    if (!modalVisiblef) {
      setModalVisiblef(true);
    }
  };
  
  const closeModal = () => {
    setModalVisiblef(false);
  };

  const { userTraining, setUserTraining } = useUserData();
  const [goal, setGoal] = useState('');

  useEffect(() => {
    if (route.params && route.params.maximaleWiederholung && route.params.maximalesGewicht) {
      loadTrainingData();
      generateTrainingLists(selectedImageIndex);
    }
  }, [route.params]);

  const loadTrainingData = async () => {
    try {
      setGoal(userTraining.goal || '');
      if (goal === 'Muskelaufbau') {
        generateTrainingLists();
      }
    } catch (error) {
      console.error('Fehler beim Laden der Trainingsdaten:', error);
    }
  };

  const generateRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const calculateWeightsAndReps = (goal, maximalesGewicht) => {
    const list1 = [];
    const list2 = [];

    if (goal === 'Muskelaufbau') {
      const randomRepCount = generateRandomInt(6, 12);

      let percentage = 0;
      switch (randomRepCount) {
        case 6:
          percentage = 0.85;
          break;
        case 7:
          percentage = 0.825;
          break;
        case 8:
          percentage = 0.80;
          break;
        case 9:
          percentage = 0.775;
          break;
        case 10:
          percentage = 0.75;
          break;
        case 11:
          percentage = 0.725;
          break;
        case 12:
          percentage = 0.70;
          break;
        default:
          percentage = 0;
          break;
      }

      if (maximalesGewicht > 0) {
        for (let i = 0; i < 4; i++) {
          list1.push(randomRepCount);
        }

        for (let i = 0; i < 4; i++) {
          list2.push(Math.round(percentage * maximalesGewicht));
        }
      } else {
        list2.fill(0);
      }
    } else {
      list1.fill(0);
      list2.fill(0);
    }

    return { list1, list2 };
  };

  const generateTrainingLists = async (selectedImageIndex) => {
    const updatedImageContents = [...imageContents];
  
    if (goal === 'Muskelaufbau' && maximalesGewicht > 0 && selectedImageIndex < updatedImageContents.length) {
      const { list1, list2 } = calculateWeightsAndReps(goal, maximalesGewicht);
      updatedImageContents[selectedImageIndex].list1 = list1;
      updatedImageContents[selectedImageIndex].list2 = list2;
  
      await AsyncStorage.setItem('imageContents', JSON.stringify(updatedImageContents));
      setImageContents(updatedImageContents);
    } else if (selectedImageIndex < updatedImageContents.length) {
      const { list1, list2 } = calculateWeightsAndReps(goal, maximalesGewicht);
      updatedImageContents[selectedImageIndex].list1 = list1;
      updatedImageContents[selectedImageIndex].list2 = list2;
  
      await AsyncStorage.setItem('imageContents', JSON.stringify(updatedImageContents));
      setImageContents(updatedImageContents);
    }
  };

  return (
    <View style={styles.infoBlockContainer}>
      <ScrollView horizontal style={{ flexDirection: 'row' }}>
        {images.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => handleImageSelect(index)}>
            <Image
              source={image.primaryImage}
              style={{ width: 100, height: 100, marginRight: 10, borderRadius: 10 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.container1}>
        <Image source={images[selectedImageIndex].primaryImage} style={{ width: 70, height: 70, borderRadius: 10 }} />
        <Text style={styles.headingStyle}>{imageContents[selectedImageIndex].heading}</Text>
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
              data={imageContents[selectedImageIndex].list1}
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
              data={Array(imageContents[selectedImageIndex].list1.length + 1).fill('X')}
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
              data={imageContents[selectedImageIndex].list2}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.listItem1}>
                  <Text style={styles.itemText1}>{item}</Text>
                  <TouchableOpacity
                    onPress={() => handleCheck2(index)}
                    style={[styles.checkbox1, imageContents[selectedImageIndex].checkboxList2[index] && styles.checkedCheckbox1]}
                  >
                    {imageContents[selectedImageIndex].checkboxList2[index] && <Text>X</Text>}
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      <DifficultyModal
        modalVisible={modalVisible}
        handleModalClose={handleModalClose}
        handleDifficultySelect={handleDifficultySelect}/>
      <View style={styles.buttonsContainer1}>
        <TouchableOpacity onPress={handleDelete} style={styles.button1}>
          <Text style={styles.buttonText1}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd} style={styles.button1}>
          <Text style={styles.buttonText1}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer1}>
        <TouchableOpacity onPress={InfoTouch}>
          <Text style={styles.sectionText}>Info</Text>
        </TouchableOpacity>
        <InfoModal
        infoVisible={infoVisible}
        handleInfoClose={handleInfoClose}
        selectedImageIndex={selectedImageIndex}
        imageContents={imageContents}/>
        <TouchableOpacity onPress={null}>
          <Text style={styles.sectionText}>Gewichte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={null}>
          <Text style={styles.sectionText}>Fortschritt</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisiblef}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <GewichtUndWiederholungen closeModal={closeModal} />
      </Modal>   
    </View>
  );
}
