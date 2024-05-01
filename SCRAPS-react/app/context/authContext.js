import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


/**
 * @module Auth-Context
 * @description Enables authentication and user data across the application
 */

const AuthContext = createContext();

/**
 * A context provider component for managing authentication state.
 * 
 * @param {object} props - The props object containing the following properties:
 * @param {React.ReactNode} props.children - The child components that will have access to the authentication context.
 * @returns {JSX.Element} A context provider component wrapping its children with the authentication context.
 */


const AuthProvider = ({ children }) => {
    const[login, setLogin] = useState({
        user:null,
    });
    
    /**
     * Function for loading user authentication data from local storage.
     * 
     * This function asynchronously retrieves user authentication data
     * from local storage using the specified key '@auth'. It then parses
     * the retrieved data and updates the component state with the user
     * data if available.
     */
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data = await AsyncStorage.getItem('@auth');
            let loginData = JSON.parse(data);
            setLogin({...login, user:loginData?.user});
        };
        loadLocalStorageData();
    }, []);
    

    return(
        <AuthContext.Provider value = {[login, setLogin]}>
            {children}
        </AuthContext.Provider>
    )
};   

export { AuthContext, AuthProvider };
