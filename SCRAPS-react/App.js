import React from 'react';
import { ImageProvider } from './app/context/imagecontext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './app/context/authContext';
import Tabs from './app/component/tab';
import Login from './app/screens/Login';
import Recipe from './app/screens/Recipe';
import Register from './app/screens/Register';
import Preference from './app/screens/Preference';
import UserProfile from './app/screens/UserProfile';
import ResetEmail from './app/screens/ResetEmail';
import ResetPassword from './app/screens/ResetPassword';




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
      <AuthProvider>
      <Stack.Navigator>
        <Stack.Screen name = "HomeTabs" component={HomeTabs} options={{headerShown:false}}/>
        <Stack.Screen name = "Preference" component={Preference} options={{headerShown:false}}/>
        <Stack.Screen name = "Recipe" component={Recipe} options={{headerShown:false}}/>
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}
