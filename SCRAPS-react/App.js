import React from 'react';
import { ImageProvider } from './app/context/imagecontext';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './app/component/tab';
import Login from './app/screens/Login';
import Profile from './app/screens/Profile';

const Stack = createNativeStackNavigator();


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
        <Stack.Screen name = "Login" component={Login} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
