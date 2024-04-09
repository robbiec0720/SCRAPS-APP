import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#e1d5c9',
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
    },
    registerContainer: {
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
})