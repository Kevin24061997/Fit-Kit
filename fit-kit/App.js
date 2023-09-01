import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkblue',
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 40,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    color: 'white',
    fontSize: 26,
  },
  dateText: {
    color: 'white',
    fontSize: 22,
  },

  infoBlockContainer: {
    flex: 1, // Fülle den verfügbaren Raum aus
    backgroundColor: 'black', // Grauer Hintergrund für den Container
    maxHeight: 600,
    padding: 20, // Innenabstand des Containers
  },
  infoBlock: {
    flexDirection: 'row',
    backgroundColor: 'darkblue', // Schwarzer Hintergrund für die Info-Blöcke
    height: 200,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  infoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionText: {
    color: 'white', // Grauer Text für "Einstellung" und "Training"
    fontSize: 22,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
  },
  sectionContainer: {
    flexDirection: 'row', // Container nebeneinander
    justifyContent: 'space-between', // Container nebeneinander mit Abstand
  },
});

const Page = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((dayAbbr, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{dayAbbr}</Text>
            <Text style={styles.dateText}>{index + 1}</Text>
          </View>
        ))}
      </View>

      <ScrollView style={styles.infoBlockContainer}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Info 1</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Info 2</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Info 3</Text>
        </View>
      </ScrollView>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Einstellung</Text>
        <Text style={styles.sectionText}>Training</Text>
      </View>
    </View>
  );
}

export default Page;