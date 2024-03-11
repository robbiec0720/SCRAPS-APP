import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function InputField({ inputFieldName }) {
    return (
       <View>
        <Text>{ inputFieldName }</Text>
        <TextInput style={styles.inputField}></TextInput>
       </View>
    );
}


const styles = StyleSheet.create({
    inputField: {
      height:40,
      marginBottom:20,
      backgroundColor:'#ffffff',
      borderRadius:10,
      marginTop: 10,
      paddingLeft: 10,
    },
  });
    