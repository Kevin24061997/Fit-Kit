import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Stile und Funktionen importieren
import { styles } from './styles';
import { HeaderTimer } from './function/HeaderTimer';
import { PushTimer } from './function/PushTimer';
import { Bilder } from './function/Bilder';
import { DifficultyModal } from './Modal/DifficultyModal'; // Importieren Sie das Schwierigkeitsauswahl-Modal
import { InfoModal } from './Modal/InfoModal'; // Importieren Sie das Informations-Modal
import { Speichern } from './function/Speichern';
import { initialImageContents } from './function/imageData';

export function EinzelÜbungScreen() {
  const navigation = useNavigation();

    // Funktion zum Speichern der berechneten Daten
  const { saveImageContentsToStorage, loadImageContentsFromStorage } = Speichern();

  // Funktion zum Speichern der Daten, wenn sie geändert werden
  const saveData = (updatedImageContents) => {
    setImageContents(updatedImageContents);
    saveImageContentsToStorage(updatedImageContents);
  };
  
  HeaderTimer(navigation, false);

  // Timer in Container ##############################

  const { startTimer, decreaseTime, handleTimerTextClick, formatTime1, increaseTime } = PushTimer();

  // Bilder ##############################
  const images = Bilder

  // Inhalt für jedes Bild
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
    // Hier den Code zur Verarbeitung des Löschen-Buttons einfügen
    if (imageContents[selectedImageIndex].list1.length > 1 && imageContents[selectedImageIndex].list2.length > 0) {
      const newList1 = [...imageContents[selectedImageIndex].list1];
      const newList2 = [...imageContents[selectedImageIndex].list2];
      const newCheckboxList1 = [...imageContents[selectedImageIndex].checkboxList1];
      const newCheckboxList2 = [...imageContents[selectedImageIndex].checkboxList2];

      newList1.pop(); // Entfernt den letzten Eintrag aus Liste 1
      newList2.pop(); // Entfernt den letzten Eintrag aus Liste 2
      newCheckboxList1.pop(); // Entfernt den letzten Eintrag aus Checkbox-Liste 1
      newCheckboxList2.pop(); // Entfernt den letzten Eintrag aus Checkbox-Liste 2

      const updatedImageContents = [...imageContents];
      updatedImageContents[selectedImageIndex].list1 = newList1;
      updatedImageContents[selectedImageIndex].list2 = newList2;
      updatedImageContents[selectedImageIndex].checkboxList1 = newCheckboxList1;
      updatedImageContents[selectedImageIndex].checkboxList2 = newCheckboxList2;

      saveData(updatedImageContents);
    }
  };

  const handleCheck2 = (index) => {
    // Hier den Code zur Verarbeitung der Checkboxen einfügen
    const newCheckboxList2 = [...imageContents[selectedImageIndex].checkboxList2];
    newCheckboxList2[index] = !newCheckboxList2[index];

    const updatedImageContents = [...imageContents];
    updatedImageContents[selectedImageIndex].checkboxList2 = newCheckboxList2;

    saveData(updatedImageContents);
    setModalVisible(true); // Öffnet das Modal beim Klicken auf die Checkbox
  };

  const [infoVisible, setInfoVisible] = useState(false);

  const handleInfoClose = () => {
    setInfoVisible(false);
  };

  const InfoTouch = () => {
    setInfoVisible(true)
  }


  const handleAdd = () => {
    // Hier den Code zur Verarbeitung des Hinzufügen-Buttons einfügen
    if (imageContents[selectedImageIndex].list1.length < 6) {
      // Überprüfung, ob die maximale Anzahl von Einträgen erreicht ist
      const newItem = (parseInt(imageContents[selectedImageIndex].list1[imageContents[selectedImageIndex].list1.length - 1]) + 1).toString(); // Erzeugt eine neue Zahl

      const newList1 = [...imageContents[selectedImageIndex].list1, newItem];
      const newList2 = [...imageContents[selectedImageIndex].list2, newItem];
      const newCheckboxList1 = [...imageContents[selectedImageIndex].checkboxList1, false];
      const newCheckboxList2 = [...imageContents[selectedImageIndex].checkboxList2, false];

      const updatedImageContents = [...imageContents];
      updatedImageContents[selectedImageIndex].list1 = newList1;
      updatedImageContents[selectedImageIndex].list2 = newList2;
      updatedImageContents[selectedImageIndex].checkboxList1 = newCheckboxList1;
      updatedImageContents[selectedImageIndex].checkboxList2 = newCheckboxList2;

      saveData(updatedImageContents);
    } else {
      // Hier können Sie eine Benachrichtigung anzeigen oder andere Maßnahmen ergreifen,
      // um dem Benutzer mitzuteilen, dass die maximale Anzahl von Einträgen erreicht ist.
    }
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  // Wenn die Komponente geladen wird, versuche, die gespeicherten Daten zu laden
  useEffect(() => {
    const loadStoredData = async () => {
      const storedData = await loadImageContentsFromStorage();
      if (storedData) {
        setImageContents(storedData);
      }
    };

    loadStoredData();
  }, []);
  

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

      <View style={styles.container1 }>
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
    </View>
  );
}