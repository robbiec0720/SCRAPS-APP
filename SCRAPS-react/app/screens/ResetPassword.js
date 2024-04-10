import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import axios from 'axios';
import InputField from '../component/InputField';
import SubmitButton from '../component/SubmitButton';
import { styles } from '../styles/styles'

export default function ResetPassword({navigation}){
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
                'http://192.168.1.129:8080/api/v1/user/resetPassword', 
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
