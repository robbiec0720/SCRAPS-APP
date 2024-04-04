import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Keyboard, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';

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
                <Text style={styles.boldtext}>Preferences</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("HomeTabs")}  
                >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.continueButton}
                    onPress={() => navigation.navigate("Recipe")}  
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.label}>Max Cook Time (minutes):</Text>
                    <TextInput
                        style={[styles.input, styles.rightAligned]}
                        keyboardType="numeric"
                        value={cookTime}
                        onChangeText={text => setCookTime(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Max Missing Ingredients:</Text>
                    <TextInput
                        style={[styles.input, styles.rightAligned]}
                        keyboardType="numeric"
                        value={missing}
                        onChangeText={text => setMissing(text)}
                    />
                </View>
            </View>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Ingredients</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                {ingredients.length > 0 && 
                    (ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={styles.label}>{ingredient}</Text>
                            <TouchableOpacity onPress={() => handleRemoveIngredient(index)} style={styles.removeButton}>
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                )))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Ingredient"
                    value={newIngredient}
                    onChangeText={setNewIngredient}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        backgroundColor: '#FA7070',
        width: '100%',
        alignItems: 'center',
    },
    table: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 5,
        marginHorizontal: 10
    },
    boldtext: {
        fontWeight: 'bold',
        fontSize: 20, 
        color: '#fff', 
    },
    continueButton: {
        width: '20%',
        marginTop: 5,
        marginLeft: '55%',
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButton: {
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
    },
    removeButton: {
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
    },
    backButton: {
        width: '20%',
        marginTop: 5,
        marginLeft: 10,
        backgroundColor: '#FA7070',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    label: {
        flex: 1,
        textAlign: 'left',
        marginRight: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    rightAligned: {
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 5,
        marginBottom: 20
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: 100,
    },
    scrollContainer: {
        height: '35%', 
        width: '100%', 
        padding: 10
    },
});