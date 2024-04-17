import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons'

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