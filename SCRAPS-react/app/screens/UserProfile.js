import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { styles } from '../styles/styles'
import { loginStyles } from '../styles/loginStyles'
import SubmitButton from '../component/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserProfile({ navigation }) {
    const [login, setLogin] = useContext(AuthContext);

    const handleLogout = async () => {
        setLogin({user: null});
        await AsyncStorage.removeItem('@auth');
        alert('Logout Successfully');
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style = {loginStyles.scrollView}>
                <View style = {styles.header}>
                    <Text style = {styles.boldtext}>USER PROFILE</Text>
                </View>
                <View style = {loginStyles.username}>
                    <Text style = {loginStyles.boldUserNameText}>{login.user.username}</Text>
                    <Text style = {loginStyles.boldEmailText}>{login.user.email}</Text>
                </View>
                <View style = {loginStyles.resetEmailBtn}>
                    <SubmitButton 
                        buttonName={'Reset Email'}
                        handleSubmit={() => {navigation.navigate('ResetEmail')}}
                    />
                </View>
                <View style = {loginStyles.resetPasswordBtn}>
                    <SubmitButton 
                        buttonName={'Reset Password'}
                        handleSubmit={() => {navigation.navigate('ResetPassword')}}
                    />
                </View>
                <View style={loginStyles.dietaryRestrictionsBtn}>
                    <SubmitButton
                        buttonName={'Dietary Restrictions'}
                        handleSubmit={() => {navigation.navigate('DietaryRestrictions')}}
                    />
                </View>
                <TouchableOpacity>
                    <Text 
                        style={loginStyles.logoutText} 
                        onPress={handleLogout}>
                        Log Out
                    </Text>
                </TouchableOpacity>
                <Text style={loginStyles.deleteAccountText}>Delete My Account</Text>
            </ScrollView>
        </SafeAreaView>
    )
}
