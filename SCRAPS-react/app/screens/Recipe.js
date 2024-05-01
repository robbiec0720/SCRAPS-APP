import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';
import { AuthContext } from '../context/authContext';
import { styles } from '../styles/styles'
import { recipeStyles } from '../styles/recipeStyles'
import axios from 'axios';
import { EXPO_FLASK_URL } from "@env";

/**
 * @module Recipe-Screen
 * @description Defines Recipe UI flow.
 */

/**
 * Function to handle pressing a link.
 * @function handleLinkPress
 * @description This function checks if the provided URL can be opened, and if supported, it opens the URL using the device's default browser.
 * @param {string} url - The URL to be opened.
 * @returns {Promise<void>} A promise that resolves once the URL is opened or rejects if an error occurs.
 */
const handleLinkPress = async(url) => {
    console.log(url);
    try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log('Do not know how to open URI: ', url);
        }
    } catch (error) {
        console.error('Error opening link:', error);
    }
};

/**
 * Recipe card component to display recipe information.
 * @function RecipeCard
 * @description This component renders a recipe card with details such as title, cook time, missing ingredients, and match score.
 * It also provides a clickable link to view the full recipe.
 * @param {object} recipe - The recipe object containing information such as title, cook time, ingredients, score, and link.
 * @param {string[]} ingredients - An array of ingredients available to the user.
 * @returns {JSX.Element} A recipe card component displaying recipe details and a clickable link to view the full recipe.
 */
const RecipeCard = ({ recipe, ingredients }) => {
    // console.log('recipe ingredients', recipe.ingredients)
    // console.log('user ingredeints', ingredients)
    const diff = recipe.ingredients.filter(i => !ingredients.includes(i.toLowerCase()));
    // console.log('diff', diff)

    return (
        <View>
            <TouchableOpacity onPress={() => handleLinkPress(recipe.link)}>
                <Text style={recipeStyles.title}>{recipe.title}</Text>

                <Text>
                    <Text style={recipeStyles.infoTitle}>Cook Time: </Text>
                    <Text style={recipeStyles.info}>{recipe.cook_time}</Text>
                </Text>
                
                <Text>
                    <Text style={recipeStyles.infoTitle}>Missing Ingredients: </Text>
                    {diff.length > 0 && (
                        <Text style={recipeStyles.info}>{diff.join(', ')}</Text>
                    )}
                    {diff.length == 0 && (
                        <Text style={recipeStyles.info}>none</Text>
                    )}
                </Text>
                
                <Text>
                    <Text style={recipeStyles.infoTitle}>Match Score: </Text>
                    <Text style={recipeStyles.info}>{Math.round(recipe.score * 10000) / 100}%</Text>
                </Text>
                
                {/* <TouchableOpacity onPress={() => handleLinkPress(recipe.link)}>
                    {recipe.link && (
                        <Text>
                            <Text style={recipeStyles.link}>Recipe Link</Text>
                            <Text style={recipeStyles.link}>{recipe.link}</Text>
                        </Text>
                    )}
                </TouchableOpacity> */}
            </TouchableOpacity>
      </View>
    );
};    

/**
 * Function to call the backend API to fetch recommended recipes.
 * @function CallRecipes
 * @description This function sends a POST request to the backend server endpoint '/recommend' with the provided parameters.
 * It expects the server to respond with recommended recipes based on the user's ingredients, cook time preference,
 * and maximum missing ingredients allowed.
 * @param {string[]} ingredients - An array of ingredients available to the user.
 * @param {number} cookTime - The maximum cook time preference specified by the user (in minutes).
 * @param {number} missing - The maximum number of missing ingredients allowed in a recommended recipe.
 * @param {object} userjson - The JSON object containing user information.
 * @returns {Promise<object[]>} A promise that resolves to an array of recommended recipes retrieved from the server.
 */
const CallRecipes = async (ingredients, cookTime, missing, userjson) => {
    try {
        console.log(ingredients);
        const { data } = await axios.post(
            `${EXPO_FLASK_URL}`+':9000/recommend', 
            {cookTime, missing, userjson, ingredients}
            );
        //console.log('data',data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

/**
 * Home component responsible for displaying recommended recipes based on user preferences.
 * @function RecipeHome
 * @description This component fetches and displays recommended recipes based on the user's ingredients, cook time preference, and maximum allowed missing ingredients.
 * It utilizes the `useIngredients` and `useInfo` hooks to access ingredient and preference data.
 * The `useContext` hook is used to access authentication context to retrieve user information.
 * @param {object} navigation - Navigation object for navigating between screens.
 */
export default function Home({navigation}) {
    const { ingredients } = useIngredients(); // Get user ingredients from context
    const { cookTime, missing } = useInfo(); // Get cook time and missing ingredient preferences from context
    const [loading, setLoading] = useState(false); // State to manage loading state of recipe data
    const [recipes, setRecipes] = useState([]); // State to store fetched recipes
    const [login] = useContext(AuthContext); // Get user authentication context
    const userjson = JSON.stringify(login.user); // Convert user object to JSON string


    /**
     * React useEffect hook to fetch and set recommended recipes when the component mounts.
     * @function useEffect
     * @description This effect runs once when the component mounts. It asynchronously calls the CallRecipes function to fetch
     * recommended recipes based on the user's ingredients, cook time preference, and maximum allowed missing ingredients.
     * Upon receiving the recipes from the server, it sets the recipes state and updates the loading state to indicate
     * that the data has been loaded.
     * @param {string[]} ingredients - An array of ingredients available to the user.
     * @param {number} cookTime - The maximum cook time preference specified by the user (in minutes).
     * @param {number} missing - The maximum number of missing ingredients allowed in a recommended recipe.
     * @param {object} userjson - The JSON object containing user information.
     */
    useEffect(() => {
        (async () => {
            try {
                // Await the recipes from CallRecipes
                const data = await CallRecipes(ingredients, cookTime, missing, userjson);
                setRecipes(data);
                setLoading(true);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching recipes:', error)
            }
        })();
    }, []);

    if(loading) {
        return (
            <View style={recipeStyles.container}>
                <View style={styles.header}>
                    <Text style={styles.boldtext}>RECIPES</Text>
                </View>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Preference')}  
                >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                {recipes.length > 0 ? (
                    <ScrollView styles={recipeStyles.scrollContainer}>
                        {recipes.map((recipe, index) => (
                            <View key={index} style={recipeStyles.recipeContainer}>
                                <RecipeCard key={index} recipe={recipe} ingredients={ingredients}></RecipeCard>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <View style={styles.instructionsContainer}>
                        <Text style={styles.instructionsText}>No recipes were found</Text>
                    </View>
                )}
                <StatusBar style='auto' />
            </View>
    );}
    else {
        return (
            <View style={recipeStyles.container}>
                <View style={styles.header}>
                    <Text style={styles.boldtext}>LOADING RECIPES...</Text>
                </View>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Preference')}  
                >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
