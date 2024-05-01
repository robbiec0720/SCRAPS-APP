import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { styles } from '../styles/styles'
import { loginStyles } from '../styles/loginStyles'
import InputField from '../component/InputField';
import SubmitButton from '../component/SubmitButton';
import { EXPO_NODE_URL } from '@env';

/**
 * @module Login-Screen
 * @description Defines Login UI.
 */

/**
 * A component for user login.
 * @function Login
 * @description This component provides a login form where users can enter their username and password.
 * Upon submission, it sends a POST request to the server to authenticate the user.
 * If authentication is successful, it stores the user data in AsyncStorage and navigates to the UserProfile screen.
 * If authentication fails, it displays an error message.
 * 
 * @param {object} navigation - The navigation object provided by React Navigation.
 * @returns {JSX.Element} A component containing a login form.
 */

export default function Login({navigation}) {
    // Get the login state and setter function from the AuthContext
    const [login, setLogin] = useContext(AuthContext);

    // State variables for username, password, and loading state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * Function to handle form submission.
     * @function handleSubmit
     * @description This function validates the form fields, sends a POST request to the server to authenticate the user,
     * and handles the response accordingly.
     * @returns {void}
     */
    const handleSubmit = async () => {
        try {
          setLoading(true);
          if(!username || !password){
            Alert.alert('Please fill all fields');
            setLoading(false);
            return;
          }
          //console.log('Login data ==> ', {username, password});
          setLoading(false);
          const { data } = await axios.post(
            `${EXPO_NODE_URL}`+':8080/api/v1/user/login', 
            {username, password}
          );
          setLogin(data);
          await AsyncStorage.setItem('@auth', JSON.stringify(data));
          alert(data && data.message);
          navigation.navigate('UserProfile');
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            //console.log(error);
        }
    }

    // const getLocalStorageData = async () => {
    //   let data = await AsyncStorage.getItem('@auth');
    //   console.log('local storage', data);
    // }
    // getLocalStorageData();
    return (
        <View style={styles.homeContainer}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>USER PROFILE</Text>
            </View>
            <View style={loginStyles.registerContainer}>
                <Text style={loginStyles.createAccountText}>Login</Text>
                <View style={{ marginHorizontal: 20}}>
                   <InputField
                    inputFieldName={'Username'} 
                    value={username} 
                    setValue={setUsername} 
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
             buttonName={'Login'} 
             loading={loading}
             handleSubmit={handleSubmit}
             />
            <Text style={loginStyles.loginText}>
                Don't have an account?{' '} 
                <Text 
                    style={loginStyles.loginLinkText}
                    onPress={() => navigation.navigate('Register')}
                >
                    Register here
                </Text>{' '}
            </Text>
        <StatusBar style='auto' />
      </View>
    );
}
