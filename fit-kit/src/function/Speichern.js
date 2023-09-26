import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialImageContents } from './imageData';


// Ändern Sie den Schlüssel auf 'appData' für die allgemeinen App-Daten
const STORAGE_KEY = 'appData';

// Ihre bestehende Speichern-Funktion
export function Speichern() {
  const saveImageContentsToStorage = async (imageContents) => {
    try {
      const jsonValue = JSON.stringify(imageContents);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('Daten erfolgreich gespeichert:', jsonValue);
    } catch (error) {
      console.error('Fehler beim Speichern der Daten:', error);
    }
  };
  
  const loadImageContentsFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : initialImageContents;
  } catch (error) {
    console.error('Fehler beim Laden der Daten:', error);
    return initialImageContents;
  }
};
  

  // useEffect(() => {
  //   const loadData = async () => {
  //     const savedData = await loadImageContentsFromStorage();
  //     console.log('savedData in useEffect:', savedData); // Hinzugefügter Log
  //     if (savedData) {
  //       updateInitialImageContents();
  //     }
  //   };
  
  //   loadData();
  // }, []); // Stellen Sie sicher, dass der Abhängigkeitsarray korrekt ist

  useEffect(() => {
    updateInitialImageContents();
  }, []); // Stellen Sie sicher, dass der Abhängigkeitsarray korrekt ist
  
  

  const updateInitialImageContents = async () => {
    console.log('updateInitialImageContents called'); // Hinzugefügter Log
    try {
      // Laden Sie die gespeicherten Daten
      const savedData = await loadImageContentsFromStorage();
      console.log('savedData:', savedData); // Hinzugefügter Log
  
      if (savedData && Array.isArray(savedData.imageContents)) {
        initialImageContents.forEach((item, selectedImageIndex) => {
          if (
            savedData.imageContents[selectedImageIndex] &&
            Array.isArray(savedData.imageContents[selectedImageIndex].list1) &&
            Array.isArray(savedData.imageContents[selectedImageIndex].list2)
          ) {
            item.list1 = savedData.imageContents[selectedImageIndex].list1;
            item.list2 = savedData.imageContents[selectedImageIndex].list2;
            console.log(`Updated item ${selectedImageIndex}:`, item.list1, item.list2);
          }
        });
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Daten:', error);
    }
  };

  return { saveImageContentsToStorage, loadImageContentsFromStorage, updateInitialImageContents };
}
