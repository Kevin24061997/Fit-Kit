import AsyncStorage from '@react-native-async-storage/async-storage';

export function Speichern() {
  const saveImageContentsToStorage = async (imageContents) => {
    try {
      const jsonValue = JSON.stringify(imageContents);
      await AsyncStorage.setItem('imageContents', jsonValue);
    } catch (error) {
      console.error('Fehler beim Speichern der Daten:', error);
    }
  };

  const loadImageContentsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('imageContents');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
      return null;
    }
  };

  const updateInitialImageContents = async () => {
    // Laden Sie die gespeicherten Daten
    const savedData = await loadImageContentsFromStorage();

    if (savedData) {
      // Aktualisieren Sie list1 und list2 in initialImageContents mit den gespeicherten Werten
      initialImageContents.forEach((item, index) => {
        item.list1 = savedData[index].list1;
        item.list2 = savedData[index].list2;
      });
    }
  };


  return { saveImageContentsToStorage, loadImageContentsFromStorage, updateInitialImageContents };
}
