import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext()


const AuthProvider = ({ children }) => {
    const[login, setLogin] = useState({
        user:null,
    });

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
