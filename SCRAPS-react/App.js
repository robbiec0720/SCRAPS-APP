import React from 'react';
import { ImageProvider } from './app/context/imagecontext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './app/component/tab';
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
        <Stack.Screen name = "Home" component={HomeTabs} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name = "Preference" component={Preference} options={{headerShown:false}}></Stack.Screen> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}
