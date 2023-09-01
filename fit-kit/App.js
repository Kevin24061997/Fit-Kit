import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
    marginTop: 0,
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
  currentDateText: {
    color: 'red',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

const Stack = createNativeStackNavigator();

function InfoBlockScreen() {
  return (
    <View>
      <Text>InfoBlock 1</Text>
      {/* Weitere Inhalte für InfoBlock 1 */}
    </View>
  );
}

function EinstellungScreen() {
  return (
    <View>
      <Text>Einstellung</Text>
      {/* Weitere Inhalte für den Einstellung-Bildschirm */}
    </View>
  );
}

const Page = ({ navigation }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startOfWeek, setStartOfWeek] = useState(new Date());

  useEffect(() => {
    // Ermitteln Sie den aktuellen Tag der Woche (0 = Sonntag, 1 = Montag, ...)
    const currentDayOfWeek = currentDate.getDay();

    // Berechnen Sie das Datum des Beginns der aktuellen Woche (Montag)
    const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - daysToMonday);

    // Aktualisieren Sie den Start der Woche und das aktuelle Datum
    setStartOfWeek(monday);
  }, []);

  function getDayOfWeek(dayIndex) {
    // Diese Funktion gibt den Wochentag (Mo, Di, ...) für einen gegebenen Index zurück.
    const daysOfWeek = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
    return daysOfWeek[dayIndex];
  }



  function navigateToInfoBlockScreen() {
    navigation.navigate('InfoBlock');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {Array.from({ length: 7 }).map((_, index) => {
          // Erstellen Sie ein Array mit 7 Tagen (0 bis 6) und mappen Sie es auf die Anzeige
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + index);

          return (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayText}>{getDayOfWeek(index)}</Text>
              <Text
                style={[
                  styles.dateText,
                  day.getDate() === currentDate.getDate() ? styles.currentDateText : null,
                ]}
              >
                {day.getDate()}
              </Text>
            </View>
          );
        })}
      </View>

      <ScrollView style={styles.infoBlockContainer}>
        <TouchableOpacity onPress={navigateToInfoBlockScreen}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Info 1</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Info 2</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Info 3</Text>
        </View>
        </TouchableOpacity>

        {/* Weitere Info-Blöcke mit TouchableOpacity */}
        
      </ScrollView>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>Einstellung</Text>
        <Text style={styles.sectionText}>Training</Text>
      </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Page">
        <Stack.Screen name="Training" component={Page} options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white', 
          },
        }} />
        <Stack.Screen name="InfoBlock" component={InfoBlockScreen} options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white', 
          },
        }} />
        <Stack.Screen name="Einstellung" component={EinstellungScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;