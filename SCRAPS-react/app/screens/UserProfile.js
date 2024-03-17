import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import SubmitButton from '../component/SubmitButton';



export default function UserProfile({ navigation }) {
    const [login] = useContext(AuthContext);


    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style = {styles.scrollView}>
                <View style = {styles.header}>
                    <Text style = {styles.boldtext}>USER PROFILE</Text>
                </View>
                <View style = {styles.username}>
                    <Text style = {styles.boldUserNameText}>{login.user.username}</Text>
                    <Text style = {styles.boldEmailText}>{login.user.email}</Text>
                </View>
                <View style = {styles.resetEmailBtn}>
                    <SubmitButton 
                        buttonName={"Reset Email"}
                        
                    />
                </View>
                <View style = {styles.resetPasswordBtn}>
                    <SubmitButton 
                        buttonName={"Reset Password"}
                        handleSubmit={() => {navigation.navigate('ForgotPassword')}}
                    />
                </View>
                <View style={styles.dietaryRestrictionsBtn}>
                    <SubmitButton
                        buttonName={"Dietary Restrictions"}
                    />
                </View>
                <Text style={styles.logoutText}>Log Out</Text>
                <Text style={styles.deleteAccountText}>Delete My Account</Text>
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#e1d5c9',
    },
    header: {
        flex: 0,
        padding: 20,
        backgroundColor: '#FA7070',
        width: '100%',
        alignItems: 'center',
    },
    username: {
        marginTop: '5%',
        alignItems: 'center',
    },
    boldUserNameText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    boldEmailText: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    boldtext: {
        fontWeight: 'bold',
        fontSize: 20, 
        color: '#fff', 
    },
    resetEmailBtn: {
        paddingTop: '10%',
    },
    resetPasswordBtn: {
        
    },
    dietaryRestrictionsBtn: {
        paddingTop: '65%',
    },
    logoutText: {
        textAlign:'center',
        marginTop:'5%',
        fontSize: 15,
    },
    deleteAccountText: {
        textAlign:'center',
        marginTop:'5%',
        fontSize: 15,
        color:'red'
    }
    
})