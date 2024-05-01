import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

/**
 * @module Button-Component
 * @description Defines the button for the application.
 */


/**
 * A customizable button component with an optional icon and text.
 * @function Button
 * @param {object} props - The props object containing the following properties:
 * @param {string} props.title - The text displayed on the button.
 * @param {function} props.onPress - The function to be called when the button is pressed.
 * @param {string} props.icon - The name of the Ionicons icon to be displayed on the button.
 * @param {string} [props.color] - The color of the icon (default: '#f1f1f1').
 * @param {number} [props.size] - The size of the icon (default: determined by Ionicons size).
 * @returns {JSX.Element} A TouchableOpacity component representing the button.
 */
export default function Button({title, onPress, icon, color, size}) {
    return(
        <TouchableOpacity onPress={onPress}>
            <Ionicons name={icon} size={size} color={color ? color : '#f1f1f1'}/>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      height: 100,
      width:  100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#f1f1f1',
        marginLeft: 10,
    }
});