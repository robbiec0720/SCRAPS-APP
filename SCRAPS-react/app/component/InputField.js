import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * @module InputField-Component
 * @description Defines the input field for the application.
 */

/**
 * A customizable input field component.
 * 
 * @param {object} props - The props object containing the following properties:
 * @param {string} props.inputFieldName - The label displayed above the input field.
 * @param {string} [props.autoComplete] - Determines whether auto-completion is enabled for the input field.
 * @param {string} [props.keyboardType] - Specifies the type of keyboard to display.
 * @param {boolean} [props.secureTextEntry=false] - Determines whether the text entered in the input field is obscured.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.setValue - The function to be called when the input field value changes.
 * @returns {JSX.Element} A View containing a text label and a TextInput component representing the input field.
 */

export default function InputField({ 
    inputFieldName,
    autoComplete,
    keyboardType,
    secureTextEntry=false,
    value,
    setValue 
})
    {
    return (
       <View>
        <Text>{ inputFieldName }</Text>
        <TextInput 
        style={styles.inputField}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
        />
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
    