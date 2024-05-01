import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * @module SubmitButton-Component
 * @description Defines the Submit Button for the application.
 */

/**
 * A customizable submit button component.
 * 
 * @param {object} props - The props object containing the following properties:
 * @param {string} props.buttonName - The text displayed on the button.
 * @param {function} props.handleSubmit - The function to be called when the button is pressed.
 * @param {boolean} props.loading - Determines whether the button is in a loading state.
 * @param {boolean} props.clicked - Determines whether the button has been clicked.
 * @param {boolean} props.userHasRestriction - Determines whether the user has restrictions.
 * @returns {JSX.Element} A TouchableOpacity component representing the submit button.
 */

export default function SubmitButton({
     buttonName,
     handleSubmit, 
     loading,
     clicked,
     userHasRestriction,

})
    {
    return (
        <TouchableOpacity style={[stlyes.submitBtn, userHasRestriction && stlyes.clickedButton]} onPress={handleSubmit}>
            <Text style={stlyes.btnText}>
                {loading ? "Submitted" : buttonName}
            </Text>
        </TouchableOpacity>
    );
}

const stlyes = StyleSheet.create({
    submitBtn: {
        backgroundColor: '#FA7070',
        height: 50,
        // marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: 'center',
        marginBottom: 20,
        alignItems: 'center'
    },
    btnText: {
        color: '#ffffff',
        // marginLeft: "5%",
        fontSize: 24,
        fontWeight: '400',
    },
    clickedButton: {
        backgroundColor: 'green', // Change background color to green when clicked
    },
})