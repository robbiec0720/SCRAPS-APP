import React, {useState, useContext} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import { styles } from '../styles/styles'
import { loginStyles } from '../styles/loginStyles'
import InputField from "../component/InputField";
import SubmitButton from "../component/SubmitButton";

export default function Login({navigation}) {
    const [login, setLogin] = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
            'http://10.228.214.152:8080/api/v1/user/login', 
            {username, password}
          );
          setLogin(data);
          await AsyncStorage.setItem('@auth', JSON.stringify(data));
          alert(data && data.message);
          navigation.navigate("UserProfile");
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
             buttonName={"Login"} 
             loading={loading}
             handleSubmit={handleSubmit}
             />
            <Text style={loginStyles.loginText}>
                Don't have an accountt?{" "} 
                <Text 
                    style={loginStyles.loginLinkText}
                    onPress={() => navigation.navigate('Register')}
                >
                    Register here
                </Text>{" "}
            </Text>
        <StatusBar style="auto" />
      </View>
    );
}
