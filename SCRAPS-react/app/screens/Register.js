import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Text, View } from 'react-native';
import { styles } from '../styles/styles'
import { loginStyles } from '../styles/loginStyles'
import InputField from '../component/InputField';
import SubmitButton from '../component/SubmitButton';
import axios from 'axios';


export default function Register({navigation}) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

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
            'http://192.168.1.129:8080/api/v1/user/register', 
            {username, email, password}
          );
          alert(data && data.message);
          navigation.navigate('Login');
          // setLoading(false);
        } catch (error) {
            alert(error.response.data.message);
            setLoading(false);
            //console.log(error);
        }
    }

    return (
        <View style={styles.container}>
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
  