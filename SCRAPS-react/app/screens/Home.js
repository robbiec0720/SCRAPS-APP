import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useImages } from '../context/imagecontext';
import { useIngredients } from '../context/ingredientContext';
import { styles } from '../styles/styles'
import { homeStyles } from '../styles/homeStyles'
import * as FileSystem from 'expo-file-system';
import {EXPO_FLASK_URL} from '@env';

/**
 * @module Home-Screen
 * @description Defines UI flow
 */


/**
 * Component for the Home screen.
 * @function Home
 * @description This component displays the SCRAPS logo in the header.
 * If there are images available, it renders them in a scrollable view with a 'Remove' button for each image.
 * If there are no images, it displays instructions on how to use SCRAPS.
 * It provides a 'Continue' button to navigate to the preference screen.
 * 
 * @param {object} navigation - The navigation object used for navigating between screens.
 * @returns {JSX.Element} - The rendered Home screen component.
 */
export default function Home({navigation}) {
    // Get images and functions related to images from the image context
    const { images, setImages } = useImages();
    // Get ingredients and functions related to ingredients from the ingredient context
    const {ingredients, addIngredient} = useIngredients();

    /**
     * Function to remove an image from the images array
     * @function removeImage
     * @returns {void}
     */
    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    /**
     * Function for navigating to the preference screen based on detected ingredients in images.
     * @function navigatePreference
     * @description This function iterates through the images array, sends each image to the server for ingredient detection,
     * and updates the ingredient list based on the detected ingredients.
     * After processing all images, it navigates to the preference screen.
     * @returns {void}
     */

    const navigatePreference = async () => {
        images.forEach(async (img) => {
            try {
                const data = await FileSystem.uploadAsync(`${EXPO_FLASK_URL}`+':9000/detect',
                img, {
                    headers: {
                        'content-type': 'image/jpeg'
                    },
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
                });
                const parseData = JSON.parse(data.body);
                console.log(parseData)
                
                parseData['ingredients'].forEach(async (ingr) => {
                    // newIngrs.push(ingr);
                    if(!ingredients.includes(ingr))
                        addIngredient(ingr);
                });

            } catch(err) {
                console.log(err);
            }

        });
        navigation.navigate('Preference');
    };

    return (
        <View style={homeStyles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>SCRAPS</Text>
            </View>

            {images.length > 0 ? (
                <ScrollView style={homeStyles.scrollContainer}>
                    {images.map((uri, index) => (
                        <View key={index}>
                            <Image source={{ uri }} style={homeStyles.image} />
                            <TouchableOpacity
                                style={homeStyles.removeButton}
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
                    <Text style={styles.instructionsText}>1. Navigate to the profile page and either login or create an account.</Text>
                    <Text style={styles.instructionsText}>2. Edit dietary restrictions if necessary.</Text>
                    <Text style={styles.instructionsText}>3. Go to camera to take pictures of your ingredients.</Text>
                    <Text style={styles.instructionsText}>4. Come back to this page to view or remove images.</Text>
                    <Text style={styles.instructionsText}>5. Click continue to select your preferences and check ingredients.</Text>
                    <Text style={styles.instructionsText}>6. Click continue to view the recommended recipes.</Text>
                </View>
            )}

            <TouchableOpacity
                style={homeStyles.continueButton}
                onPress={() => navigatePreference()}  
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <StatusBar style='auto' />
        </View>
    );
}
