import React from 'react';
import { View, Text, Button } from 'react-native';

function GewichtUndWiederholungen({ closeModal }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
        <Text>Gewicht und Wiederholungen</Text>
        {/* Fügen Sie hier Ihren Inhalt für Gewicht und Wiederholungen hinzu */}
        <Button title="Schließen" onPress={closeModal} />
      </View>
    </View>
  );
}

export default GewichtUndWiederholungen;
