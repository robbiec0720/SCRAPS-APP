import React, {useState, useContext} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import InputField from "../component/InputField";
import SubmitButton from "../component/SubmitButton";


export default function ForgotPassword(){
    return(
        <View>
            <Text>
                Forgot Email
            </Text>
        </View>
    )
}