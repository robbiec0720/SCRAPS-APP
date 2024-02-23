import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 
import Home from "../screens/Home";
import Camera from "../screens/Camera";
import Profile from "../screens/Profile";
import { TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator()

const CustomTabbutton = ({children, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                top: -30,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            <View style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#FA7070', 
            }}>
                {children}
            </View>
        </TouchableOpacity>
    )
}

const Tabs = () => {
    return(
        <Tab.Navigator 
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    elevation: 0,
                    borderRadius: 15,
                    height: 80,
                },
                headerShown: false,
            }}
        >
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <FontAwesome5 name="home" color={'#A6CF98'} size={30}/>
                    ),
                }}
            />
            <Tab.Screen name="Camera" component={Camera}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome5 name="camera" color={'#A6CF98'} size={30}/>
                    ),
                    // tabBarButton: (props) => (
                    //     <CustomTabbutton {...props}/>
                        
                    // )
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                    <FontAwesome5 name="user-cog" color={'#A6CF98'} size={30}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Tabs;