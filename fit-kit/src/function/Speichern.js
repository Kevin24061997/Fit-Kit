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

  // Funktion zum Laden der gespeicherten Daten
  const loadImageContentsFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('imageContents');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
      return null;
    }
  };
  return { saveImageContentsToStorage, loadImageContentsFromStorage };
}
