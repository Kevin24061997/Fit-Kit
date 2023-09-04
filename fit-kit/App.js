import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TimerHeader } from './src/TimerHeader';
import { EinstellungScreen } from './src/EinstellungScreen';
import { EinzelÜbungScreen } from './src/EinzelÜbungScreen';
import { Page } from './src/Page';

export const TimerContext = React.createContext();

const Stack = createNativeStackNavigator();

function App() {
  const [timer, setTimer] = useState({ seconds: 0, isRunning: false });

  return (
    <TimerContext.Provider value={{ timer, setTimer }}>
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