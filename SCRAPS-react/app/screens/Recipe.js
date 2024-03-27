import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking, ScrollView, TouchableOpacity } from 'react-native';

const handleLinkPress = () => {
    if (recipe.link) {
        Linking.openURL(recipe.link);
    }
};

const RecipeCard = ({ recipe }) => {
    return (
        <TouchableOpacity onPress={handleLinkPress} style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.cuisineType}>{recipe.cuisine_type}</Text>
            <Text style={styles.ingredientsTitle}>Ingredients:</Text>
            <View style={styles.ingredientsContainer}>
                {recipe.ingredients.map((ingredient, index) => (
                    <Text key={index} style={styles.ingredient}>{ingredient}</Text>
                ))}
            </View>
            {recipe.link && (
                <Text style={styles.link}>Recipe Link: {recipe.link}</Text>
            )}
      </TouchableOpacity>
    );
};    

export default function Home({navigation}) {
    const recipes = [
        {
          id: 1,
          title: 'Spaghetti Carbonara',
          cuisine_type: 'Italian',
          ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan Cheese', 'Black Pepper'],
          link: 'https://bing,com',
        },
        {
          id: 2,
          title: 'Chicken Curry',
          cuisine_type: 'Indian',
          ingredients: ['Chicken', 'Onion', 'Tomato', 'Curry Powder', 'Coconut Milk'],
          link: 'https://google.com',
        },
        {
            id: 3,
            title: 'Bacon Cheeseburger',
            cuisine_type: 'American',
            ingredients: ['Ground Beef', 'Bun', 'Tomato', 'Lettuce', 'Cheese', 'Bacon', 'Ketchup'],
            link: 'https://google.com',
        },
        {
            id: 4,
            title: 'Cereal',
            cuisine_type: 'American',
            ingredients: ['Cereal', 'Milk'],
            link: 'https://google.com',
        },
        // Add more recipes as needed
      ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>Recipes</Text>
            </View>
            

            {recipes.length > 0 && (
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {recipes.map((recipe, index) => (
                        <View style={styles.recipeContainer}>
                            {/* <Text>Test</Text> */}
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
    cuisineType: {
        fontSize: 16,
        marginBottom: 10,
    },
    ingredientsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    ingredientsContainer: {
        marginBottom: 10,
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 5,
    },
    link: {
        fontSize: 14,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
