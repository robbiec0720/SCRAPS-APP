import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Linking, ScrollView, TouchableOpacity } from 'react-native';
import { useIngredients } from '../context/ingredientContext';
import { useInfo } from '../context/infoContext';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const handleLinkPress = async(url) => {
    console.log(url);
    try {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            console.log("Don't know how to open URI: ", url);
        }
    } catch (error) {
        console.error('Error opening link:', error);
    }
};

const RecipeCard = ({ recipe, ingredients }) => {
    const diff = recipe.ingredients.filter(i => !ingredients.includes(i.toLowerCase()));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text>
                <Text style={styles.infoTitle}>Cook Time: </Text>
                <Text style={styles.info}>{recipe.cook_time}</Text>
            </Text>
            
            <Text>
                <Text style={styles.infoTitle}>Missing Ingredients: </Text>
                {diff.length > 0 && (
                    <Text style={styles.info}>{diff.join(', ')}</Text>
                )}
                {diff.length == 0 && (
                    <Text style={styles.info}>none</Text>
                )}
            </Text>

            <TouchableOpacity onPress={() => handleLinkPress(recipe.link)}>
                {recipe.link && (
                    <Text>
                        <Text style={styles.infoTitle}>Recipe Link: </Text>
                        <Text style={styles.link}>{recipe.link}</Text>
                    </Text>
                )}
            </TouchableOpacity>
      </View>
    );
};    

const CallRecipes = async (ingredients, cookTime, missing, userjson) => {
    try {
        const { data } = await axios.post(
            'http://10.229.53.208:9000/recommend', 
            {cookTime, missing, userjson, ingredients}
            );
        //console.log("data",data);
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.boldtext}>Recipes</Text>
                </View>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Preference")}  
                >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
                {recipes.length > 0 && (
                    <ScrollView contentContainerStyle={styles.scrollContainer} maintainVisibleContentPosition={{ auto: true }}>
                        {recipes.map((recipe, index) => (
                            <View key={index} style={styles.recipeContainer}>
                                <RecipeCard key={index} recipe={recipe} ingredients={ingredients}></RecipeCard>
                            </View>
                        ))}
                    </ScrollView>
                )}
                <StatusBar style="auto" />
            </View>
    );}
    else {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.boldtext}>Loading Recipes...</Text>
                </View>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Preference")}  
                >
                    <Text style={styles.buttonText}>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    scrollContainer: {
        width: '100%',
        padding: 10
    },
    header: {
        padding: 20,
        backgroundColor: '#FA7070',
        width: '100%',
        alignItems: 'center',
    },
    boldtext: {
        fontWeight: 'bold',
        fontSize: 20, 
        color: '#fff', 
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
        // alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#FA7070',
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
        marginBottom: 5, 
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
