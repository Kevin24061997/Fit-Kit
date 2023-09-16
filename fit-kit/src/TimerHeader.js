import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { HeaderTimer } from './function/HeaderTimer';
import { Bilder } from './function/Bilder';
import { initialImageContents } from './function/imageData';


export function TimerHeader() {
  const navigation = useNavigation();
  
  const [imageContents, setÜbungsBlöcke] = useState(initialImageContents);

  HeaderTimer(navigation, true);

  const addÜbungsBlock = () => {
    if (imageContents.length < 9) {
      const newÜbungsBlöcke = [...imageContents, initialImageContents[imageContents.length]];
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };

  const removeÜbungsBlock = () => {
    if (imageContents.length > 1) {
      const newÜbungsBlöcke = imageContents.slice(0, imageContents.length - 1);
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };

  const images = Bilder;

  return (
    <ScrollView style={styles.ÜbungsBlockContainer}>
      <View style={styles.buttonContainer1}>
        <Text style={styles.buttonText1} onPress={addÜbungsBlock}>
          Hinzufügen
        </Text>
        <Text style={styles.buttonText1} onPress={removeÜbungsBlock}>
          Entfernen
        </Text>
      </View>
      {imageContents.map((imageContent, index) => (
        <TouchableOpacity
          key={index}
          style={styles.ÜbungsBlock}
          onPress={() => navigation.navigate('EinzelÜbung', { selectedImageIndex: index, images })}>
          <Image
            source={images[index].primaryImage}
            style={{
              width: 120,
              height: 120,
              borderRadius: 10,
              padding: 10,
              marginTop: 5,
            }}
          />
          <Text style={styles.buttonText1}>{`${index + 1}: ${imageContent.heading}`}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}