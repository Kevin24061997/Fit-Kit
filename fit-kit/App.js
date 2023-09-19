import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TimerHeader } from './src/TimerHeader';
import { EinstellungScreen } from './src/EinstellungScreen';
import { EinzelÜbungScreen } from './src/EinzelÜbungScreen';
import { Page } from './src/Page';
import { TimerContext } from './src/TimerContext';
import { UserDataProvider } from './src/InputPages/UserDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { MainScreen } from './src/MainScreen';
import {InputPage1} from './src/InputPages/InputPage1';
import {InputPage2} from './src/InputPages/InputPage2';
import {InputPage3} from './src/InputPages/InputPage3';
import {InputPage4} from './src/InputPages/InputPage4';
import {InputPage5} from './src/InputPages/InputPage5';
import {InputPage6} from './src/InputPages/InputPage6';
import {InputPage7} from './src/InputPages/InputPage7';
import {InputPage8} from './src/InputPages/InputPage8';
import {InputPage9} from './src/InputPages/InputPage9';


const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage wurde erfolgreich geleert.');
  } catch (error) {
    console.error('Fehler beim Leeren des AsyncStorage:', error);
  }
};

// Rufen Sie die Funktion zum Leeren des AsyncStorage auf, wenn Sie es benötigen.
// clearAsyncStorage();

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
      <UserDataProvider>
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
                color: 'black', 
              },
            }}
            />  
            <Stack.Screen name="InputPage1" component={InputPage1} options={{
              headerStyle: {
                backgroundColor: 'black',
              },headerTitleStyle: {
                color: 'black', 
              },
            }}  />
            <Stack.Screen
              name="InputPage2"
              component={InputPage2}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/>
            <Stack.Screen
              name="InputPage3"
              component={InputPage3}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/>
            <Stack.Screen
              name="InputPage4"
              component={InputPage4}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/>
            <Stack.Screen
              name="InputPage5"
              component={InputPage5}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/>
            <Stack.Screen
              name="InputPage6"
              component={InputPage6}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/>
            <Stack.Screen
              name="InputPage7"
              component={InputPage7}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/> 
            <Stack.Screen
              name="InputPage8"
              component={InputPage8}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/> 
            <Stack.Screen
              name="InputPage9"
              component={InputPage9}
              options={{
                headerStyle: {
                  backgroundColor: 'black',
                },headerTitleStyle: {
                  color: 'black', 
                },
              }}/>             
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
      </UserDataProvider>
    </TimerContext.Provider>  
  );
}

export default App;