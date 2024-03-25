
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function SubmitButton({
     buttonName,
     handleSubmit, 
     loading
})
    {
    return (
        <TouchableOpacity style={stlyes.submitBtn} onPress={handleSubmit}>
            <Text style={stlyes.btnText}>
                {loading ? "Submitted" : buttonName}
            </Text>
        </TouchableOpacity>
    );
}

const stlyes = StyleSheet.create({
    submitBtn: {
        backgroundColor: '#1e2225',
        height: 50,
        marginHorizontal: 25,
        borderRadius: 80,
        justifyContent: 'center',
        marginBottom: 20,
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '400',
    },
})