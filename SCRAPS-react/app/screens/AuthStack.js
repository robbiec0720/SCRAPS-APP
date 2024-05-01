import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import UserProfile from "./UserProfile";
import ResetEmail from "./ResetEmail";
import ResetPassword from "./ResetPassword";
import DietaryRestrictions from "./DietaryRestrictions";

/**
 * @module AuthStack-Screen
 * @description Defines User Profile UI flow.
 */


/**
 * A stack navigator component for handling authentication screens.
 * @function AuthStack 
 * @returns {JSX.Element}
 * @description A stack navigator component containing login, register, profile, and password reset screens.
 */
export default function AuthStack() {
    // Get the login state from the AuthContext
    const [login] = useContext(AuthContext);
    const authenticatedUser = login?.user;

    // Create a stack navigators
    const Stack = createNativeStackNavigator();
    
    return (
      <Stack.Navigator>
        {authenticatedUser ? (
            <>
                <Stack.Screen name = "UserProfile" component={UserProfile} options={{headerShown:false}}/>
                <Stack.Screen name = "ResetEmail" component={ResetEmail} options={{headerShown:false}}/>
                <Stack.Screen name = "ResetPassword" component={ResetPassword} options={{headerShown:false}}/>
                <Stack.Screen name = "DietaryRestrictions" component={DietaryRestrictions} options={{headerShown:false}}/>
            </>
        ) : (
            <>
                <Stack.Screen name = "Login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name = "Register" component={Register} options={{headerShown:false}}/>
            </>
        )}
      </Stack.Navigator>
    )
}