import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import axios from 'axios';
import InputField from '../component/InputField';
import SubmitButton from '../component/SubmitButton';
import { styles } from '../styles/styles'
import { EXPO_URL } from "@env";

export default function ResetEmail({navigation}){
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
                `${EXPO_URL}`+':8080/api/v1/user/resetEmail', 
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
        <View style = {styles.homeContainer}>
            <View style = {styles.header}>
                <Text style = {styles.boldtext}>Reset Password</Text>
            </View>
            <View>
                <InputField
                    inputFieldName={'Current Email'}
                    keyboardType='email-address'
                    autoComplete='email'
                    value={oldEmail}
                    setValue={setOldEmail}
                />
                <InputField
                    inputFieldName={'New Email'}
                    keyboardType='email-address'
                    autoComplete='email'
                    value={newEmail}
                    setValue={setNewEmail}
                />
                <InputField
                    inputFieldName={'Password'}
                    value={password}
                    setValue={setPassword}
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
