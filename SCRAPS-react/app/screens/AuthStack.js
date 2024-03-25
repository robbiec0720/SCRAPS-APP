
import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import UserProfile from "./UserProfile";
import ResetEmail from "./ResetEmail";
import ResetPassword from "./ResetPassword";


export default function AuthStack() {
    const [login] = useContext(AuthContext);
    const authenticatedUser = login?.user;

    const Stack = createNativeStackNavigator();
    
    return (
      <Stack.Navigator>
        {authenticatedUser ? (
            <>
                <Stack.Screen name = "UserProfile" component={UserProfile} options={{headerShown:false}}/>
                <Stack.Screen name = "ResetEmail" component={ResetEmail} options={{headerShown:false}}/>
                <Stack.Screen name = "ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
            </>
        ) : (
            <>
                <Stack.Screen name = "Register" component={Register} options={{headerShown:false}}/>
                <Stack.Screen name = "Login" component={Login} options={{headerShown:false}}/>
            </>
        )}
      </Stack.Navigator>
    )
}