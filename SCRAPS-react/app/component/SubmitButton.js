
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

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