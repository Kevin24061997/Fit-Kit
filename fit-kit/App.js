import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// TimerContext erstellen
const TimerContext = React.createContext();

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
  timerText: {
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  // #####################################

  ÜbungsBlockContainer: {
    flex: 1, // Fülle den verfügbaren Raum aus
    backgroundColor: 'black', // Grauer Hintergrund für den Container
    maxHeight: 800,
    padding: 20, // Innenabstand des Containers
    
  },
  ÜbungsBlock: {
    flexDirection: 'row',
    backgroundColor: 'darkblue', // Schwarzer Hintergrund für die Info-Blöcke
    height: 150,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  infoText: {
    color: 'white',
    flex: 1,
    marginRight: 10,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  buttonText1: {
    fontSize: 16,
    color: 'white',
  },
});

const Stack = createNativeStackNavigator();

// Timer ##################################################################

function TimerHeader() {
  const navigation = useNavigation();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [übungsBlöcke, setÜbungsBlöcke] = useState([]);

  function navigateToEinzelÜbung() {
    navigation.navigate('EinzelÜbung');
  }

  const addÜbungsBlock = () => {
    // Hier füge einen neuen Übungsblock hinzu, z.B. "Übung X"
    const newÜbungsBlöcke = [...übungsBlöcke, `Übung`];
    setÜbungsBlöcke(newÜbungsBlöcke);
  };

  const removeÜbungsBlock = () => {
    // Hier entferne den letzten Übungsblock
    if (übungsBlöcke.length > 0) {
      const newÜbungsBlöcke = übungsBlöcke.slice(0, übungsBlöcke.length - 1);
      setÜbungsBlöcke(newÜbungsBlöcke);
    }
  };

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const startStopTimer = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={isRunning ? 'Stop' : 'Starten'}
          onPress={startStopTimer}
        />
      ),
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 20, color: 'white' }}>{seconds} seconds</Text>
        </View>
      ),
    });
  }, [navigation, startStopTimer, isRunning, seconds]);

  return (
    <ScrollView style={styles.ÜbungsBlockContainer}>
      <View style={styles.buttonContainer1}>
        <Text style={styles.buttonText1} onPress={addÜbungsBlock}>Hinzufügen</Text>
        <Text style={styles.buttonText1} onPress={removeÜbungsBlock}>Entfernen</Text>
      </View>
      <TouchableOpacity onPress={navigateToEinzelÜbung}>
        {übungsBlöcke.map((übungsBlock, index) => (
        <View style={styles.ÜbungsBlock} key={index}>
          <Text style={styles.infoText}>{`${index + 1}: ${übungsBlock}`}</Text>
        </View>
        ))}
      </TouchableOpacity>
    </ScrollView>
  );
}


// Timer #######################################################################

function EinstellungScreen() {
  return (
    <View>
      <Text>Einstellung</Text>
      {/* Weitere Inhalte für den Einstellung-Bildschirm */}
    </View>
  );
}

function EinzelÜbungScreen() {
  return (
    <View>
      <Text>Übung</Text>
      {/* Weitere Inhalte für den Einstellung-Bildschirm */}
    </View>
  );
}

// Page ######################################################################

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
    navigation.navigate('Timer');
  }

  function navigateToInfoEinstellungScreen() {
    navigation.navigate('Einstellung');
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
      <TouchableOpacity onPress={navigateToInfoEinstellungScreen}>
        <Text style={styles.sectionText}>Einstellung</Text>
        </TouchableOpacity>
        <Text style={styles.sectionText}>Training</Text>
      </View>
    </View>
  );
}

// Page #################################################################

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
        <Stack.Screen name="Timer" component={TimerHeader} 
        options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            color: 'white', 
          },
        }} />
        <Stack.Screen name="EinzelÜbung" component={EinzelÜbungScreen} />
        <Stack.Screen name="Einstellung" component={EinstellungScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;