import React, { createContext, useState, useContext } from 'react';
import { Text, View, Keyboard, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';
import axios from 'axios';

export default function Preference({navigation}) {
    const [newIngredient, setNewIngredient] = useState('');
    const { ingredients, addIngredient, removeIngredient } = useIngredients();
    const { cookTime, missing, setCookTime, setMissing } = useInfo();

    const handleSave = async () => {
        Keyboard.dismiss();
        console.log('Max Cook Time:', cookTime);
        console.log('Max Missing Ingredients:', missing);
        try {
            const { data } = await axios.post(
                'http://192.168.1.129:5000/recommend', 
                {cookTime}
              );
        } catch (err) {
            console.log(err);
        }
    };

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
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("HomeTabs")}  
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Preferences</Text>
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
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}  
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
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
            </View>
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => navigation.navigate("Recipe")}  
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    header: {
        padding: 20,
        backgroundColor: '#FA7070',
        width: 500,
        alignItems: 'center',
    },
    table: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 40,
        marginHorizontal: 10
    },
    boldtext: {
        fontWeight: 'bold',
        fontSize: 20, 
        color: '#fff', 
    },
    saveButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center'
    },
    continueButton: {
        position: 'absolute',
        right: 10,
        bottom: 25,
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
        justifyContent: 'center',
    },
    removeButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center',
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
        marginBottom: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        width: 100,
    },
    scrollContainer: {
        maxHeight: 425, 
        width: 375
    },
});