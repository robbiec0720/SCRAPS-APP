import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useImages } from '../context/imagecontext'; // Make sure the path is correct

export default function Home({navigation}) {
    const { images, setImages} = useImages();

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>SCRAPS</Text>
            </View>

            {images.length > 0 && (
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
            )}

            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.navigate("Preference")}  
            >
                <Text style={styles.buttonText}>Continue</Text>
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
    imagesContainer: {
        paddingVertical: 20,
    },
    image: {
        width: 300, 
        height: 200,
        resizeMode: 'cover', 
        marginVertical: 10, 
        borderRadius: 10,
    },
    removeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
    continueButton: {
        position: 'absolute',
        right: 10,
        bottom: 100,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
});
