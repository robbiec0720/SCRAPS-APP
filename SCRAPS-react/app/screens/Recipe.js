import React, { useContext } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';
import { AuthContext } from '../context/authContext';

const { ingredients } = useIngredients();
const { cookTime, missing } = useInfo();

const handleLinkPress = (recipe) => {
    if (recipe.link) {
        Linking.openURL(recipe.link);
    }
};

const RecipeCard = ({ recipe }) => {
    const diff = recipe.ingredients.filter(i => !ingredients.includes(i))

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.infoTitle}>Cook Time:</Text>
            <Text style={styles.info}>{recipe.cook_time}</Text>
            <Text style={styles.infoTitle}>Missing Ingredients:</Text>
            {diff > 0 && (
                <View style={styles.ingredientsContainer}>
                    {diff.map((ingredient, index) => (
                        <Text key={index} style={styles.info}>{ingredient}</Text>
                    ))}
                </View>
            )}
            <TouchableOpacity onPress={handleLinkPress}>
                {recipe.link && (
                    <Text style={styles.link}>Recipe Link: {recipe.link}</Text>
                )}
            </TouchableOpacity>
      </View>
    );
};    

export default function Home({navigation}) {
    const recipes = [
        {
          id: 1,
          title: 'Spaghetti Carbonara',
          cook_time: '30',
          ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
          link: 'https://bing,com',
        },
        {
          id: 2,
          title: 'Chicken Curry',
          cook_time: '60',
          ingredients: ['Chicken', 'Onion', 'Tomato', 'Curry Powder', 'Coconut Milk'],
          link: 'https://google.com',
        },
        {
            id: 3,
            title: 'Bacon Cheeseburger',
            cook_time: '15',
            ingredients: ['Ground Beef', 'Bun', 'Tomato', 'Lettuce', 'Cheese', 'Bacon', 'Ketchup'],
            link: 'https://google.com',
        },
        {
            id: 4,
            title: 'Cereal',
            cook_time: '0',
            ingredients: ['Cereal', 'Milk'],
            link: 'https://google.com',
        },
        // Add more recipes as needed
      ];

    const [login, setLogin] = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Recipes</Text>
            </View>
            
            {recipes.length > 0 && (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {recipes.map((recipe, index) => (
                        <View style={styles.recipeContainer}>
                            <RecipeCard recipe={recipe}></RecipeCard>
                        </View>
                    ))}
                </ScrollView>
            )}

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.navigate("Preference")}  
            >
                <Text style={styles.buttonText}>Go Back</Text>
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
        // maxHeight: 350, 
        width: 375,
        marginTop: 50,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    header: {
        padding: 20,
        backgroundColor: '#FA7070',
        width: 500,
        alignItems: 'center',
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
    recipeContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ingredientsContainer: {
        marginBottom: 10,
    },
    info: {
        fontSize: 14,
        marginBottom: 5,
    },
    link: {
        fontSize: 14,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
