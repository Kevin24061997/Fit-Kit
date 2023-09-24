import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';

function GewichtUndWiederholungen({ closeModal }) {
  return (
    <View style={[styles.modalContainer]}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalText, { color: 'white' }]}>Maximales Gewicht</Text>
        {/* Fügen Sie hier Ihren Inhalt für Gewicht und Wiederholungen hinzu */}
        <Button title="Schließen" onPress={closeModal} />
      </View>
    </View>
  );
}

export default GewichtUndWiederholungen;
