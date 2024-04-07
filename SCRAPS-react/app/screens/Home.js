import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useImages } from '../context/imagecontext'; // Make sure the path is correct

export default function Home({navigation}) {
    const { images, setImages } = useImages();

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>SCRAPS</Text>
            </View>

            {images.length > 0 ? (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            ) : (
                <View style={styles.instructionsContainer}>
                    <Text style={styles.instructionsText}>How to Use SCRAPS:</Text>
                    <Text style={styles.instructionsText}>1. Go to camera to take pictures of your ingredients.</Text>
                    <Text style={styles.instructionsText}>2. Come back to this page to view or remove images.</Text>
                    <Text style={styles.instructionsText}>3. Click continue to select your preferences and check ingredients.</Text>
                    <Text style={styles.instructionsText}>4. Click continue to view the recommended recipes.</Text>
                </View>
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
    scrollContainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 115,
        marginTop: 35
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
        right: 0,
        top: 10,
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
    },
    continueButton: {
        position: 'absolute',
        right: 10,
        top: 70,
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    instructionsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    instructionsText: {
        fontSize: 20, 
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 28, 
    },
});
