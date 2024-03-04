import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>PROFILE</Text>
            </View>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
      padding: 20,
      backgroundColor: '#FA7070',
      width: '100%',
      alignItems: 'center',
  },
  boldtext: {
      fontWeight: 'bold',
      fontSize: 20, 
      color: '#fff', 
  },
});
  