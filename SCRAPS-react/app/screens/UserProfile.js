import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';


export default function UserProfile() {
    const [login] = useContext(AuthContext);
    return(
        <View>
            <Text>Home</Text>
            <Text>{JSON.stringify(login, null, 4)}</Text>
        </View>
    )
}