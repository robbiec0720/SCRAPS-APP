import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useImages } from '../context/imagecontext';
import { useIngredients } from '../context/ingredientContext';
import { styles } from '../styles/styles'
import { homeStyles } from '../styles/homeStyles'
import * as FileSystem from 'expo-file-system';

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
        // const ingrSet = Set(newIngrs);
        // ingrSet.forEach((ingr) => {
        //     addIngredient(ingr);
        // })
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
