import React, {useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import InputField from "../component/InputField";
import SubmitButton from "../component/SubmitButton";

export default function Login({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        try {
          setLoading(true);
          if(!username || !password){
            Alert.alert('Please fill all fields');
            setLoading(false);
            return;
          }
          console.log('Login data ==> ', {username, password});
          setLoading(false);
        } catch (error) {
            setLoading(false);
            //console.log(error);
        }
    }

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
                    onPress={() => navigation.navigate('Profile')}
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
    