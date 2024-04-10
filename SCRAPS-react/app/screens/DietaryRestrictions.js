import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import SubmitButton from '../component/SubmitButton';
import { AuthContext } from '../context/authContext';
import { styles } from '../styles/styles'
import { loginStyles } from '../styles/loginStyles';
import axios from 'axios';
import { EXPO_URL } from "@env";


export default function DietaryRestrictions(){
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

    const handleSave = async () => {
        try {
            const { data } = await axios.post(
                `${EXPO_URL}`+':8080/api/v1/user/updateDietaryRestrictions', 
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
                                buttonName={'DONE WITH PREFERENCES'} 
                                handleSubmit={handleSave}
                            />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
