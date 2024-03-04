import React from 'react';
import { ImageProvider } from './app/context/imagecontext';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './app/component/tab';

export default function App() {
  return (
    <NavigationContainer>
      <ImageProvider>
        <Tabs/>
      </ImageProvider>
    </NavigationContainer>
  );
}
