import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TimerHeader } from './src/TimerHeader';
import { EinstellungScreen } from './src/EinstellungScreen';
import { EinzelÜbungScreen } from './src/EinzelÜbungScreen';
import { Page } from './src/Page';
import { TimerContext } from './src/TimerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


import {InputPage1} from './InputPage1';
import {InputPage2} from './InputPage2';
import { MainScreen } from './src/MainScreen';



const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage wurde erfolgreich geleert.');
  } catch (error) {
    console.error('Fehler beim Leeren des AsyncStorage:', error);
  }
};

// Rufen Sie die Funktion zum Leeren des AsyncStorage auf, wenn Sie es benötigen.
clearAsyncStorage();

const Stack = createNativeStackNavigator();

export function App() {
  const [timer, setTimer] = useState({ seconds: 0, isRunning: false });

  useEffect(() => {
    checkIfAppStarted();
  }, []);

  const checkIfAppStarted = async () => {
    try {
      const value = await AsyncStorage.getItem('appStarted');
      if (value === null) {
        // App wird zum ersten Mal gestartet
        await AsyncStorage.setItem('appStarted', 'true'); // Markieren Sie die App als gestartet
      }
    } catch (error) {
      console.error('Fehler beim Lesen von AsyncStorage:', error);
    }
  };

  return (
    <TimerContext.Provider value={{ timer, setTimer }}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{
            headerStyle: {
              backgroundColor: 'black',
            }
            ,}} />
          <Stack.Screen name="Training" component={Page} options={{
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              color: 'white', 
            },
          }}
           />  
          <Stack.Screen name="InputPage1" component={InputPage1} options={{
            headerStyle: {
              backgroundColor: 'black',
            },
          }} 
          />
          <Stack.Screen
            name="InputPage2"
            component={InputPage2}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
            }}
          />
          <Stack.Screen
            name="Timer"
            component={TimerHeader}
            options={{
              headerStyle: {
                backgroundColor: 'black',
              },
            }}
          />
          <Stack.Screen name="EinzelÜbung" component={EinzelÜbungScreen}
          options={{
            headerStyle: {
              backgroundColor: 'black',
            },
          }}
           />
          <Stack.Screen name="Einstellung" component={EinstellungScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerContext.Provider>  
  );
}

export default App;