import React, {useState, useContext} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from "../context/authContext";
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
            'http://10.229.29.135:8080/api/v1/user/login', 
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
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.boldtext}>USER PROFILE</Text>
            </View>
            <View style={styles.registerContainer}>
                <Text style={styles.createAccountText}>Login</Text>
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
            <Text style={styles.loginText}>
                Don't have an accountt?{" "} 
                <Text 
                    style={styles.loginLinkText}
                    onPress={() => navigation.navigate('Register')}
                >
                    Register here
                </Text>{" "}
            </Text>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: '15%',
      height: '100%',
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
    registerContainer: {
      // backgroundColor: 'blue',
      margin: '10%',
    },
    createAccountText: {
      fontSize: 25,
      fontWeight: "bold",
      textAlign: 'center',
      marginBottom: 15,
    },
    inputField: {
      height:40,
      marginBottom:20,
      backgroundColor:'#ffffff',
      borderRadius:10,
      marginTop: 10,
      paddingLeft: 10,
    },
    loginText:{
      textAlign: 'center',
    },
    loginLinkText:{
      color:'red',
    }
  });
    