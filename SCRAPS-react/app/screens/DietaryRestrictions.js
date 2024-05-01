import { View, Text, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import SubmitButton from '../component/SubmitButton';
import { AuthContext } from '../context/authContext';
import { styles } from '../styles/styles'
import { loginStyles } from '../styles/loginStyles';
import axios from 'axios';
import { EXPO_NODE_URL } from "@env";

/**
 * @module DietaryRestrictions-Screen
 * @description Defines dietary restrictions UI.
 */


/**
 * Component for managing user dietary restrictions.
 * @function DietaryRestrictions
 * @returns {void}
 * @description This component displays buttons for various dietary restrictions,
 * allowing the user to toggle them on and off.
 * It also includes a save button to update the user's dietary restrictions.
 * @param {object} navigation - The navigation object provided by React Navigation.
 */
export default function DietaryRestrictions({navigation}){
    // State variables for managing user login and clicked buttons
    const [login, setLogin] = useContext(AuthContext);
    const [clickedButtons, setClickedButtons] = useState({
        Shellfish: false,
        Lactose: false,
        Gluten: false,
        Nut: false,
        Vegetarian: false,
        Pescatarian: false,
        Vegan: false,
        Kosher: false,
        Halal: false,
    });

    /**
     * Handles the click event for a button.
     * @function handleClick
     * @returns {void}
     * @description This function toggles the state of a button when clicked.
     * It updates the state of `clickedButtons` to reflect the clicked status of the button.
     * It also updates the user context stored in `login.user` to reflect the clicked status of the button.
     * @param {string} buttonName The name of the button that was clicked.
     */
    const handleClick = (buttonName) => {
        setClickedButtons({ ...clickedButtons, [buttonName]: !clickedButtons[buttonName] });

        // Update login.user context here
        setLogin(prevLogin => ({
            ...prevLogin,
            user: {
                ...prevLogin.user,
                [buttonName.toLowerCase()]: !prevLogin.user[buttonName.toLowerCase()]
            }
        }));
    };

    /**
     * Handles the save operation for updating dietary restrictions.
     * @function handleSave
     * @returns {void}
     * @description
     * This function sends a POST request to the server to update the user's dietary restrictions.
     * It includes the user's dietary restrictions as parameters in the request payload.
     * After the request is sent, it displays an alert with the response message, if available.
     * Finally, it navigates to the user profile screen
     */

    const handleSave = async () => {
        try {
            const { data } = await axios.post(
                `${EXPO_NODE_URL}`+':8080/api/v1/user/updateDietaryRestrictions', 
                {
                    vegetarian: login.user.vegetarian,
                    vegan: login.user.vegan,
                    halal: login.user.halal,
                    kosher: login.user.kosher,
                    lactose: login.user.lactose,
                    gluten: login.user.gluten,
                    nut: login.user.nut,
                    shellfish: login.user.shellfish,
                    pescatarian: login.user.pescatarian,
                    id: login.user.id
                }
                );
            alert(data && data.message);
            navigation.navigate('UserProfile');
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <View style={styles.homeContainer}>
            <ScrollView style = {loginStyles.scrollView}>
                <View style = {loginStyles.header}>
                    <Text style = {styles.boldtext}>DIETARY RESTRICTIONS</Text>
                </View>
                <View>
                    <View style={loginStyles.card}>
                        <Text style={loginStyles.cardheader}>ALLERGIES</Text>
                        <View style={loginStyles.buttonContainer}>
                        <SubmitButton
                                buttonName={'Shellfish'}
                                handleSubmit={() => handleClick('Shellfish')}
                                loading={false}
                                clicked={clickedButtons['Shellfish']}
                                userHasRestriction={login.user.shellfish} 
                            />
                            <SubmitButton
                                buttonName={'Lactose'}
                                handleSubmit={() => handleClick('Lactose')}
                                loading={false}
                                clicked={clickedButtons['Lactose']}
                                userHasRestriction={login.user.lactose} 
                            />
                            <SubmitButton
                                buttonName={'Gluten'}
                                handleSubmit={() => handleClick('Gluten')}
                                loading={false}
                                clicked={clickedButtons['Gluten']}
                                userHasRestriction={login.user.gluten} 
                            />
                            <SubmitButton
                                buttonName={'Nut'}
                                handleSubmit={() => handleClick('Nut')}
                                loading={false}
                                clicked={clickedButtons['Nut']}
                                userHasRestriction={login.user.nut} 
                            />
                        </View>
                    </View>
                    <View style={loginStyles.card}>
                        <Text style={loginStyles.cardheader}>RELATIONSHIP WITH MEAT</Text>
                        <View style={loginStyles.buttonContainer}>
                            <SubmitButton
                                buttonName={'Pescatarian'}
                                handleSubmit={() => handleClick('Pescatarian')}
                                loading={false}
                                clicked={clickedButtons['Pescatarian']}
                                userHasRestriction={login.user.pescatarian} 
                                />
                            <SubmitButton 
                                buttonName={'Vegetarian'}
                                handleSubmit={() => handleClick('Vegetarian')}
                                loading={false}
                                clicked={clickedButtons['Vegetarian']}
                                userHasRestriction={login.user.vegetarian} 
                            />
                            <SubmitButton 
                                buttonName={'Vegan'}
                                handleSubmit={() => handleClick('Vegan')}
                                loading={false}
                                clicked={clickedButtons['Vegan']}
                                userHasRestriction={login.user.vegan} 
                            />
                        </View>
                    </View>
                    <View style={loginStyles.card}>
                        <Text style={loginStyles.cardheader}>RELIGION</Text>
                        <View style={loginStyles.buttonContainer}>
                            <SubmitButton 
                                buttonName={'Kosher'}
                                handleSubmit={() => handleClick('Kosher')}
                                loading={false}
                                clicked={clickedButtons['Kosher']}
                                userHasRestriction={login.user.kosher} 
                            />
                            <SubmitButton 
                                buttonName={'Halal'}
                                handleSubmit={() => handleClick('Halal')}
                                loading={false}
                                clicked={clickedButtons['Halal']}
                                userHasRestriction={login.user.halal} 
                            />
                        </View>
                    </View>
                    <View style={loginStyles.submit}>
                            <SubmitButton 
                                buttonName={'Save Preferences'} 
                                handleSubmit={handleSave}
                            />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
