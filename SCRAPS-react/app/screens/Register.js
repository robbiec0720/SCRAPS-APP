import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View } from 'react-native';
import { AuthContext } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/styles'
import { loginStyles } from '../styles/loginStyles'
import InputField from '../component/InputField';
import SubmitButton from '../component/SubmitButton';
import axios from 'axios';
import { EXPO_NODE_URL } from "@env";

/**
 * @module Register-Screen
 * @description User Registeration UI.
 */


/**
 * Register Component.
 * This component renders a form for user registration.
 * @param {object} navigation - Navigation object provided by React Navigation.
 * @returns {JSX.Element} JSX.Element representing the Register component.
 */
export default function Register({navigation}) {
    const [login, setLogin] = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Handles the form submission for user registration.
     * @returns {Promise<void>} A Promise that resolves when the registration is successful.
     */
    const handleSubmit = async () => {
        try {
          setLoading(true);
          if(!username || !email || !password){
            Alert.alert('Please fill all fields');
            setLoading(false);
            return;
          }
          //console.log('Register data ==> ', {username, email, password});
          const { data } = await axios.post(
            `${EXPO_NODE_URL}`+':8080/api/v1/user/register', 
            {username, email, password}
          );
          alert(data && data.message);

          const {data: data2}  = await axios.post(
            `${EXPO_NODE_URL}`+':8080/api/v1/user/login', 
            {username, password}
          );
          setLogin(data2);
          await AsyncStorage.setItem('@auth', JSON.stringify(data2));
          navigation.navigate('UserProfile');
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
        }
    }

    return (
        <View style={styles.homeContainer}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>USER PROFILE</Text>
            </View>
            <View style={loginStyles.registerContainer}>
                <Text style={loginStyles.createAccountText}>Create Account</Text>
                <View style={{ marginHorizontal: 20}}>
                   <InputField
                    inputFieldName={'Username'} 
                    value={username} 
                    setValue={setUsername} 
                    />
                   <InputField 
                    inputFieldName={'Email'} 
                    keyboardType='email-address' 
                    autoComplete='email'
                    value={email} 
                    setValue={setEmail} 
                    />
                   <InputField 
                    inputFieldName={'Password'} 
                    secureTextEntry={true}
                    value={password} 
                    setValue={setPassword}  
                    />
                </View>
            </View>
            {/* <Text> {JSON.stringify({ username, email, password}, null, 4)} </Text> */}
            <SubmitButton 
             buttonName={'Register'} 
             loading={loading}
             handleSubmit={handleSubmit}
             />
            <Text style={loginStyles.loginText}>
                Already have an account?{' '} 
                <Text 
                    style={loginStyles.loginLinkText}
                    onPress={() => navigation.navigate('Login')}
                >
                    login here
                </Text>{' '}
            </Text>
        <StatusBar style='auto' />
      </View>
    );
}
  