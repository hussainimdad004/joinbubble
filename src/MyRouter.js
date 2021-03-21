import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './components/Search/search';
import UserScreen from './components/Users/User';
import BookingScreen from './components/Bookings/bookings';
import MyStorage from './components/helpers/myStorage';
import LoginView from './components/login/Login';
import Tabs from './tabs';
import { PRIMARY_COLOR } from './components/helpers/colors';
const Stack = createStackNavigator();
export default function MyRouter() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState('')
    React.useEffect(() => {
        new MyStorage().getUserToken().then((_token) => {
            if (_token) {
                setToken(_token);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        });
    }, []);
    console.log('isLoggedIn', isLoggedIn)
    return (

        <NavigationContainer>
            {
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="LoginView" component={LoginView} />
                    <Stack.Screen name="Search" component={Tabs} />
                    <Stack.Screen name="Booking" component={Tabs} />
                    <Stack.Screen name="User" component={Tabs} />
                </Stack.Navigator>
            }
        </NavigationContainer>
    );
}