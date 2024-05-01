import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import axios from 'axios';
import InputField from '../component/InputField';
import SubmitButton from '../component/SubmitButton';
import { styles } from '../styles/styles'
import { EXPO_NODE_URL } from "@env";

/**
 * Reset Password Screen Component.
 * @module ResetPassword-Screen
 * @description Reset Password UI.
 * @param {object} navigation - Navigation object provided by React Navigation.
 * @returns {JSX.Element} JSX.Element representing the ResetPassword screen component.
 */
export default function ResetPassword({navigation}){
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Handles the form submission for resetting password.
     * @returns {Promise<void>} A Promise that resolves when the password reset is successful.
     */
    const handleSubmit = async () => {
        try{
            setLoading(true);
            if(!email || !oldPassword || !newPassword) {
                Alert.alert('Please fill all fields');
                setLoading(false);
                return;
            }
            setLoading(false);
            const { data } = await axios.post(
                `${EXPO_NODE_URL}`+':8080/api/v1/user/resetPassword', 
                {oldPassword, email, newPassword}
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
        <View style = {styles.homeContainer}>
            <View style = {styles.header}>
                <Text style = {styles.boldtext}>Reset Password</Text>
            </View>
            <View>
                <InputField
                    inputFieldName={'Email'}
                    keyboardType='email-address'
                    autoComplete='email'
                    value={email}
                    setValue={setEmail}
                />
                <InputField
                    inputFieldName={'Current Password'}
                    value={oldPassword}
                    setValue={setOldPassword}
                    secureTextEntry={true}
                />
                <InputField
                    inputFieldName={'New Password'}
                    value={newPassword}
                    setValue={setNewPassword}
                    secureTextEntry={true}
                />
            </View>
            <SubmitButton 
                buttonName={'Submit'}
                loading={loading}
                handleSubmit={handleSubmit}
            />
        </View>
    )
}
