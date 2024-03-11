import React from "react";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import InputField from "../component/InputField";

export default function Home() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>USER PROFILE</Text>
            </View>
            <View style={styles.registerContainer}>
                <Text style={styles.createAccountText}>Create Account</Text>
                <View style={{ marginHorizontal: 20}}>
                   <InputField inputFieldName={'Username'} />
                   <InputField inputFieldName={'Email'} />
                   <InputField inputFieldName={'Password'} />
                </View>
            </View>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    height: '100%',
    backgroundColor: '#e1d5c9',
  },
  header: {
      flex: 0,
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
  registerContainer: {
    // backgroundColor: 'blue',
    margin: '10%',
  },
  createAccountText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 15,
  },
  inputField: {
    height:40,
    marginBottom:20,
    backgroundColor:'#ffffff',
    borderRadius:10,
    marginTop: 10,
    paddingLeft: 10,
  },
});
  