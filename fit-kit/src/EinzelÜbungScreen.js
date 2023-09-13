import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Stile und Funktionen importieren
import { styles } from './styles';
import { HeaderTimer } from './function/HeaderTimer';
import { PushTimer } from './function/PushTimer';
import { Bilder } from './function/Bilder';

export function EinzelÜbungScreen() {
  const navigation = useNavigation();
  
  HeaderTimer(navigation, false);

  // Timer in Container ##############################

  const { startTimer, decreaseTime, handleTimerTextClick, formatTime1, increaseTime } = PushTimer();

  // Bilder ##############################
  const images = Bilder

  // Inhalt für jedes Bild
  const [imageContents, setImageContents] = useState([
    {
      heading: 'Bild 1 Überschrift',
      list1: ['01', '02', '03', '04', '05'],
      list2: ['01', '02', '03', '04', '05'],
      checkboxList1: [false, false, false, false, false],
      checkboxList2: [false, false, false, false, false],
    },
    {
      heading: 'Bild 2 Überschrift',
      list1: ['06', '07', '08', '09', '10'],
      list2: ['06', '07', '08', '09', '10'],
      checkboxList1: [false, false, false, false, false],
      checkboxList2: [false, false, false, false, false],
    },
    {
      heading: 'Bild 3 Überschrift',
      list1: ['11', '12', '13', '14', '15'],
      list2: ['11', '12', '13', '14', '15'],
      checkboxList1: [false, false, false, false, false],
      checkboxList2: [false, false, false, false, false],
    },
    {
      heading: 'Bild 4 Überschrift',
      list1: ['16', '17', '18', '19', '20'],
      list2: ['16', '17', '18', '19', '20'],
      checkboxList1: [false, false, false, false, false],
      checkboxList2: [false, false, false, false, false],
    },
    {
      heading: 'Bild 5 Überschrift',
      list1: ['21', '22', '23', '24', '25'],
      list2: ['21', '22', '23', '24', '25'],
      checkboxList1: [false, false, false, false, false],
      checkboxList2: [false, false, false, false, false],
    },
    {
      heading: 'Bild 6 Überschrift',
      list1: ['26', '27', '28', '29', '30'],
      list2: ['26', '27', '28', '29', '30'],
      checkboxList1: [false, false, false, false, false],
      checkboxList2: [false, false, false, false, false],
    },
    {
      heading: 'Bild 7 Überschrift',
      list1: ['31', '32', '33', '34', '35'],
      list2: ['31', '32', '33', '34', '35'],
      checkboxList1: [false, false, false, false, false],
      checkboxList2: [false, false, false, false, false],
    },
  ]);
  

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
    if (imageContents[selectedImageIndex].list1.length > 0 && imageContents[selectedImageIndex].list2.length > 0) {
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

      setImageContents(updatedImageContents);
    }
  };

  const handleCheck2 = (index) => {
    // Hier den Code zur Verarbeitung der Checkboxen einfügen
    const newCheckboxList2 = [...imageContents[selectedImageIndex].checkboxList2];
    newCheckboxList2[index] = !newCheckboxList2[index];

    const updatedImageContents = [...imageContents];
    updatedImageContents[selectedImageIndex].checkboxList2 = newCheckboxList2;

    setImageContents(updatedImageContents);
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

      setImageContents(updatedImageContents);
    } else {
      // Hier können Sie eine Benachrichtigung anzeigen oder andere Maßnahmen ergreifen,
      // um dem Benutzer mitzuteilen, dass die maximale Anzahl von Einträgen erreicht ist.
    }
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const ImageSwitcher = ({ imageIndex }) => {
    const [showSpecialImage, setShowSpecialImage] = useState(true);
  
    useEffect(() => {
      // Starten Sie den Timer, um das Bild alle 1,5 Sekunden zu wechseln
      const timer = setInterval(() => {
        setShowSpecialImage((prevShowSpecialImage) => !prevShowSpecialImage);
      }, 1500);
  
      return () => {
        clearInterval(timer);
      };
    }, []);
  
    return (
      <Image
        source={images[imageIndex][showSpecialImage ? 'specialImage' : 'primaryImage']}
        style={{ width: 230, height: 230, borderRadius: 10, marginBottom: 10 }}
      />
    );
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
        <TouchableOpacity onPress={InfoTouch}>
          <Text style={styles.sectionText}>Info</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={infoVisible}
          onRequestClose={handleInfoClose}>
          <View style={[styles.modalContainer]}>
            <View style={styles.modalContent1}>
            <ScrollView>
              <Text style={styles.headingStyle1}>{imageContents[selectedImageIndex].heading}</Text>
              <ImageSwitcher imageIndex={selectedImageIndex} />
              <Text style={[styles.modalText, { color: 'white' }]}>
                so und so musst du das machen und so gehts weiter und weiter und weiter 
              </Text>
              <TouchableOpacity onPress={handleInfoClose}>
                <Text style={{ color: 'white' }}>Schließen</Text>
              </TouchableOpacity>
            </ScrollView>
            </View>
          </View>
        </Modal>
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