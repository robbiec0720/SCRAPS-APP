import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function Home({navigation}) {
    // const { images, setImages} = useImages();

    // const removeImage = (index) => {
    //     setImages(images.filter((_, i) => i !== index));
    // };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Recipes</Text>
            </View>

            {/* {images.length > 0 && (
                <ScrollView contentContainerStyle={styles.container}>
                    {images.map((uri, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={{ uri }} style={styles.image} />
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeImage(index)}
                            >
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )} */}

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Preference")}  
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>

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
    backButton: {
        position: 'absolute',
        left: 10,
        top: 65,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});
