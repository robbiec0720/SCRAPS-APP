import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';
import { AuthContext } from '../context/authContext';
import { styles } from '../styles/styles'
import { recipeStyles } from '../styles/recipeStyles'
import axios from 'axios';
import { EXPO_URL } from "@env";

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

const CallRecipes = async (ingredients, cookTime, missing, userjson) => {
    try {
        console.log(ingredients);
        const { data } = await axios.post(
            `${EXPO_URL}`+':9000/recommend', 
            {cookTime, missing, userjson, ingredients}
            );
        //console.log('data',data);
        return data;
    } catch (err) {
        console.log(err);
    }
};

export default function Home({navigation}) {
    const { ingredients } = useIngredients();
    const { cookTime, missing } = useInfo();
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [login] = useContext(AuthContext); 
    const userjson = JSON.stringify(login.user)

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
