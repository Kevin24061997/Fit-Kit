import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BildTausch } from '../function/BildTausch';
import { styles } from '../styles'; // Stile importieren
import { Bilder } from '../function/Bilder';

const images = Bilder
const ImageSwitcher = BildTausch(images);


export function InfoModal({ infoVisible, handleInfoClose, selectedImageIndex, imageContents }) {
  return (
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
  );
}