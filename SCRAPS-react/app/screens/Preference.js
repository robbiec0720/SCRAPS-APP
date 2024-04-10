import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';
import { styles } from '../styles/styles'
import { prefStyles } from '../styles/prefStyles'

export default function Preference({navigation}) {
    const [newIngredient, setNewIngredient] = useState('');
    const { ingredients, addIngredient, removeIngredient } = useIngredients();
    const { cookTime, missing, setCookTime, setMissing } = useInfo();

    const handleAddIngredient = () => {
        if (newIngredient.trim() !== '') {
            addIngredient(newIngredient);
            setNewIngredient('');
        }
    };

    const handleRemoveIngredient = (index) => {
        removeIngredient(index);
        console.log(ingredients);
    };

    return (
        <View style={styles.container}>
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
                        onChangeText={text => setCookTime(text)}
                    />
                </View>
                <View style={prefStyles.row}>
                    <Text style={prefStyles.label}>Max Missing Ingredients:</Text>
                    <TextInput
                        style={[prefStyles.input, prefStyles.rightAligned]}
                        keyboardType='numeric'
                        value={missing}
                        onChangeText={text => setMissing(text)}
                    />
                </View>
            </View>
            <View style={styles.header}>
                <Text style={styles.boldtext}>INGREDIENTS</Text>
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
            <StatusBar style='auto' />
        </View>
    )
}
