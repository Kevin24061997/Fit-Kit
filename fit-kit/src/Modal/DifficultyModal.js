import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles'; // Stile importieren

export function DifficultyModal({ modalVisible, handleModalClose, handleDifficultySelect }) {
  return (
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
  );
}