import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import SubmitButton from '../component/SubmitButton';
import { AuthContext } from "../context/authContext";
import axios from 'axios';

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
                'http://192.168.1.129:8080/api/v1/user/updateDietaryRestrictions', 
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
        <SafeAreaView style={styles.container}>
            <ScrollView style = {styles.scrollView}>
                <View style = {styles.header}>
                    <Text style = {styles.boldtext}>DIETARY RESTRICTIONS</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.cardheader}>ALLERGIES</Text>
                        <View style={styles.buttonContainer}>
                        <SubmitButton
                                buttonName={"Shellfish"}
                                handleSubmit={() => handleClick("Shellfish")}
                                loading={false}
                                clicked={clickedButtons["Shellfish"]}
                                userHasRestriction={login.user.shellfish} 
                            />
                            <SubmitButton
                                buttonName={"Lactose"}
                                handleSubmit={() => handleClick("Lactose")}
                                loading={false}
                                clicked={clickedButtons["Lactose"]}
                                userHasRestriction={login.user.lactose} 
                            />
                            <SubmitButton
                                buttonName={"Gluten"}
                                handleSubmit={() => handleClick("Gluten")}
                                loading={false}
                                clicked={clickedButtons["Gluten"]}
                                userHasRestriction={login.user.gluten} 
                            />
                            <SubmitButton
                                buttonName={"Nut"}
                                handleSubmit={() => handleClick("Nut")}
                                loading={false}
                                clicked={clickedButtons["Nut"]}
                                userHasRestriction={login.user.nut} 
                            />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardheader}>RELATIONSHIP WITH MEAT</Text>
                        <View style={styles.buttonContainer}>
                            <SubmitButton
                                buttonName={"Pescatarian"}
                                handleSubmit={() => handleClick("Pescatarian")}
                                loading={false}
                                clicked={clickedButtons["Pescatarian"]}
                                userHasRestriction={login.user.pescatarian} 
                                />
                            <SubmitButton 
                                buttonName={"Vegetarian"}
                                handleSubmit={() => handleClick("Vegetarian")}
                                loading={false}
                                clicked={clickedButtons["Vegetarian"]}
                                userHasRestriction={login.user.vegetarian} 
                            />
                            <SubmitButton 
                                buttonName={"Vegan"}
                                handleSubmit={() => handleClick("Vegan")}
                                loading={false}
                                clicked={clickedButtons["Vegan"]}
                                userHasRestriction={login.user.vegan} 
                            />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardheader}>RELIGION</Text>
                        <View style={styles.buttonContainer}>
                            <SubmitButton 
                                buttonName={"Kosher"}
                                handleSubmit={() => handleClick("Kosher")}
                                loading={false}
                                clicked={clickedButtons["Kosher"]}
                                userHasRestriction={login.user.kosher} 
                            />
                            <SubmitButton 
                                buttonName={"Halal"}
                                handleSubmit={() => handleClick("Halal")}
                                loading={false}
                                clicked={clickedButtons["Halal"]}
                                userHasRestriction={login.user.halal} 
                            />
                        </View>
                    </View>
                    <View style={styles.submit}>
                            <SubmitButton 
                                buttonName={"DONE WITH PREFERENCES"} 
                                handleSubmit={handleSave}
                            />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#e1d5c9',
    },
    header: {
        flex: 0,
        padding: 20,
        backgroundColor: '#FA7070',
        width: '100%',
        alignItems: 'center',
        marginBottom: "5%",
    },
    boldtext: {
        fontWeight: 'bold',
        fontSize: 20, 
        color: '#fff', 
    },
    cardheader: {
        fontWeight: 'bold',
        fontSize: 20, 
        color: '#fff', 
        marginBottom: "5%",
    },
    card: {
        borderRadius: 10, // Adjust the border radius as needed
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
        borderColor: '#000', // Change the border color here
        borderWidth: 1.5, 
        // flexDirection: "column",
        // alignItems: "flex-start",
    },
    buttonContainer: {
        justifyContent: 'flex-start', // Align buttons to the left
        // width: "100%",
    },
    submit: {
        marginBottom: "10%",
    }
})