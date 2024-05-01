import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';
import { styles } from '../styles/styles'
import { prefStyles } from '../styles/prefStyles'

/**
 * @module Preference-Screen
 * @description Defines Preference UI.
 */

/**
 * A component for setting user preferences.
 * 
 * This component provides a form for users to set their preferences, including maximum cook time and maximum missing ingredients.
 * Users can also add and remove ingredients from their preference list.
 * 
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} A component containing a form for setting preferences.
 */

export default function Preference({navigation}) {
    // State variables for new ingredient, cook time, and missing ingredients
    const [newIngredient, setNewIngredient] = useState('');
    const { ingredients, addIngredient, removeIngredient } = useIngredients();
    const { cookTime, missing, setCookTime, setMissing } = useInfo();

    /**
     * Function to handle adding a new ingredient to the preference list.
     * 
     * This function adds a new ingredient to the list of ingredients if it is not empty.
     * It then clears the input field for adding ingredients.
     */
    const handleAddIngredient = () => {
        if (newIngredient.trim() !== '') {
            addIngredient(newIngredient);
            setNewIngredient('');
        }
    };

    /**
     * Function to handle removing an ingredient from the preference list.
     * 
     * This function removes the ingredient at the specified index from the list of ingredients.
     * 
     * @param {number} index - The index of the ingredient to be removed.
     */
    const handleRemoveIngredient = (index) => {
        removeIngredient(index);
        // console.log(ingredients);
    };

    /**
     * Function to handle focusing on text input field.
     * 
     * This function focuses on the text input field and selects its contents.
     * 
     * @param {object} textInputRef - Reference to the text input field.
     */
    const handleTextInputFocus = (textInputRef) => {
        if (textInputRef) {
            textInputRef.focus();
            textInputRef.setSelection(0, cookTime.length);
        }
    };

    return (
        // <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        //     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={prefStyles.container}>
                    <View style={styles.header}>
                        <Text style={styles.boldtext}>PREFERENCES</Text>
                    </View>
                    <View style={prefStyles.row}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.navigate('HomeTabs')}  
                        >
                            <Text style={styles.buttonText}>Go Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={prefStyles.continueButton}
                            onPress={() => navigation.navigate('Recipe')}  
                        >
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={prefStyles.table}>
                        <View style={prefStyles.row}>
                            <Text style={prefStyles.label}>Max Cook Time (minutes):</Text>
                            <TextInput
                                style={[prefStyles.input, prefStyles.rightAligned]}
                                keyboardType='numeric'
                                value={cookTime}
                                onFocus={() => handleTextInputFocus(this.cookTimeInput)}
                                ref={(input) => { this.cookTimeInput = input; }}
                                onChangeText={text => setCookTime(text)}
                            />
                        </View>
                        <View style={prefStyles.row}>
                            <Text style={prefStyles.label}>Max Missing Ingredients:</Text>
                            <TextInput
                                style={[prefStyles.input, prefStyles.rightAligned]}
                                keyboardType='numeric'
                                value={missing}
                                onFocus={() => handleTextInputFocus(this.missingInput)}
                                ref={(input) => { this.missingInput = input; }}
                                onChangeText={text => setMissing(text)}
                            />
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.boldtext}>INGREDIENTS</Text>
                    </View>
                    <View style={prefStyles.inputContainer}>
                        <TextInput
                            style={prefStyles.input}
                            placeholder='Enter Ingredient'
                            value={newIngredient}
                            onChangeText={setNewIngredient}
                        />
                        <TouchableOpacity style={prefStyles.addButton} onPress={handleAddIngredient}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={prefStyles.scrollContainer}>
                        {ingredients.length > 0 && 
                            (ingredients.map((ingredient, index) => (
                                <View key={index} style={prefStyles.row}>
                                    <Text style={prefStyles.label}>{ingredient}</Text>
                                    <TouchableOpacity onPress={() => handleRemoveIngredient(index)} style={prefStyles.removeButton}>
                                        <Text style={styles.buttonText}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                        )))}
                    </ScrollView>
                    
                    <StatusBar style='auto' />
                </View>
        //     </ScrollView>
        // </KeyboardAvoidingView>
    )
}
