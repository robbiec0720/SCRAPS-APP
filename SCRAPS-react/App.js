import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './app/component/tab';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
}
