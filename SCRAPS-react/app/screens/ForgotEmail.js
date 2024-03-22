import React, {useState, useContext} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import InputField from "../component/InputField";
import SubmitButton from "../component/SubmitButton";


export default function ForgotEmail({navigation}){
    const [password, setPassword] = useState('');
    const [oldEmail, setOldEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try{
            setLoading(true);
            if(!oldEmail || !newEmail || !password) {
                Alert.alert('Please fill all fields');
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post(
                'http://192.168.1.129:8080/api/v1/user/resetEmail', 
                {oldEmail, newEmail, password}
            );
            alert(data && data.message);
            navigation.navigate('Login');
        } catch(error){
            alert(error.response.data.message);
            setLoading(false);
            //console.log(error);
        }
    }

    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.boldtext}>Reset Password</Text>
            </View>
            <View>
                <InputField
                    inputFieldName={"Current Email"}
                    keyboardType="email-address"
                    autoComplete="email"
                    value={oldEmail}
                    setValue={setOldEmail}
                />
                <InputField
                    inputFieldName={"New Email"}
                    keyboardType="email-address"
                    autoComplete="email"
                    value={newEmail}
                    setValue={setNewEmail}
                />
                <InputField
                    inputFieldName={"Password"}
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />
            </View>
            <SubmitButton 
                buttonName={"Submit"}
                loading={loading}
                handleSubmit={handleSubmit}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1d5c9',
    },
    header: {
        flex: 0,
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

})