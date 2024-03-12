import React from 'react';
import { ImageProvider } from './app/context/imagecontext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './app/component/tab';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import Preference from './app/screens/Preference';

const Stack = createStackNavigator();

export function HomeTabs() {
  return (
    <ImageProvider>
      <Tabs/>
    </ImageProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "HomeTabs" component={HomeTabs} options={{headerShown:false}}/>
        <Stack.Screen name = "Preference" component={Preference} options={{headerShown:false}}></Stack.Screen> 
        <Stack.Screen name = "Register" component={Register} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
