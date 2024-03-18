import React, { createContext, useState, useContext } from 'react';
import { Text, View, Switch, Keyboard, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function Preference({navigation}) {
    const [cuisineType, setCuisineType] = useState('any');
    const [cookTime, setCookTime] = useState('60');
    const [missingIngredients, setMissingIngredients] = useState('5');
    const [isStarred, setIsStarred] = useState(false);
    const [ingredients, setIngredients] = useState(['Tomato', 'Lettuce', 'Ground Beef', 'Bun', 'Cheese', 'Mustard']);
    const [newIngredient, setNewIngredient] = useState('');

    const placeholder = {
      label: 'Any',
      value: 'any',
    };
  
    const cuisineTypes = [
        { label: 'Italian', value: 'italian' },
        { label: 'Mexican', value: 'mexican' },
        { label: 'Chinese', value: 'chinese' },
        { label: 'Indian', value: 'indian' },
        // Add more cuisine types as needed
    ];

    const handleSave = () => {
        Keyboard.dismiss();
        console.log('Cuisine Type(s):', cuisineType);
        console.log('Max Cook Time:', cookTime);
        console.log('Max Missing Ingredients:', missingIngredients);
        console.log('Starred Recipes Only?:', isStarred);
    };

    const handleAddIngredient = () => {
        if (newIngredient.trim() !== '') {
            setIngredients([...ingredients, newIngredient]);
            setNewIngredient('');
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedItems = [...ingredients];
        updatedItems.splice(index, 1);
        setIngredients(updatedItems);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Home")}  
            >
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Preferences</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={styles.label}>Cuisine Type:</Text>
                    <RNPickerSelect
                        style={styles.dropdown}
                        placeholder={placeholder}
                        items={cuisineTypes}
                        onValueChange={(value) => setCuisineType(value)}
                        value={cuisineType}
                    />
                </View>
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
                        value={missingIngredients}
                        onChangeText={text => setMissingIngredients(text)}
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Starred Recipes Only?:</Text>
                    <Switch
                        value={isStarred}
                        onValueChange={value => setIsStarred(value)}
                    />
                </View>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}  
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Ingredients</Text>
            </View>
            {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.row}>
                <Text style={styles.label}>{ingredient}</Text>
                <TouchableOpacity onPress={() => handleRemoveIngredient(index)} style={styles.removeButton}>
                    <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
                </View>
            ))}
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
        width: '100%',
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
    saveButton: {
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 5,
        justifyContent: 'center'
    },
    dropdown: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30
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
});