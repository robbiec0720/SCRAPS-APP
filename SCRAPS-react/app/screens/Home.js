import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useImages } from '../context/imagecontext'; // Make sure the path is correct
import { useIngredients } from '../context/ingredientContext';
import * as FileSystem from 'expo-file-system';
// import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
export default function Home({navigation}) {
    const { images, setImages } = useImages();
    const {ingredients, addIngredient} = useIngredients();
    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const navigatePreference = async () => {
        // const newIngrs = [];
        images.forEach(async (img) => {
            try {
                // const b64 = await FileSystem.readAsStringAsync(img, {
                //     encoding: FileSystem.EncodingType.Base64,

                // });
                const data = await FileSystem.uploadAsync('http:/10.183.201.118:9000/detect',
                img, {
                    headers: {
                        "content-type": "image/jpeg"
                    },
                    httpMethod: "POST",
                    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                });
                const parseData = JSON.parse(data.body);
                console.log(parseData)
                
                parseData["ingredients"].forEach(async (ingr) => {
                    // newIngrs.push(ingr);
                    if(!ingredients.includes(ingr))
                        addIngredient(ingr);
                });

            } catch(err) {
                console.log(err);
            }

        });
        // const ingrSet = Set(newIngrs);
        // ingrSet.forEach((ingr) => {
        //     addIngredient(ingr);
        // })
        navigation.navigate("Preference");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>SCRAPS</Text>
            </View>

            {images.length > 0 && (
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
            )}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigatePreference()}  
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
});
