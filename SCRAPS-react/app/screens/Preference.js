import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Preference({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Preferences</Text>
            </View>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("HomeTabs")}  
                >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
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
    backButton: {
        position: 'absolute',
        left: 10,
        top: 50,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});