import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddChild from './screens/AddChild';
import ChildLogin from './screens/ChildLogin';
import selectStories from './screens/selectStories';
import Main from './screens/Main';
import Player from './screens/Player';
import Edit from './screens/Edit';
import Recording from './screens/Recording';
import VoiceOver from './screens/VoiceOver';
import Choise from './screens/Choise';
import weekly from './screens/weekly';
import player2 from './screens/player2';
import Whorecord from './screens/Whorecord';
const Stack = createNativeStackNavigator();
console.disableYellowBox = true;
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ChildLogin"
          component={ChildLogin}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddChild"
          component={AddChild}
          options={{
            headerStyle: {
              backgroundColor: '#dfe3ee',
            },
            headerTintColor: '#3b5998',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="selectStories"
          component={selectStories}
          options={{
            headerStyle: {
              backgroundColor: '#f7f7f7',
            },
            headerTintColor: '#4267B2',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Player"
          component={Player}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          // options={{
          //   headerShown: false,
          // }}
        />
        <Stack.Screen
          name="Recording"
          component={Recording}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VoiceOver"
          component={VoiceOver}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Choise"
          component={Choise}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="weekly"
          component={weekly}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="player2"
          component={player2}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Whorecord"
          component={Whorecord}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
