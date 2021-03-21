
import React from "react";
import { View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchScreen from "./components/Search/search";
import BookingScreen from "./components/Bookings/bookings";
import UserScreen from "./components/Users/User";
import { PRIMARY_COLOR, ONYX_COLOR } from "./components/helpers/colors";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: true,
    activeTintColor: PRIMARY_COLOR,
    labelStyle: {
        fontSize: 8
    },
    inactiveTintColor: ONYX_COLOR,
    style: {
        height: 100,
        backgroundColor: '#fff',

    },
};
const Tabs = () => {

    return (
        <Tab.Navigator
            tabBarOptions={tabOptions}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    switch (route.name) {
                        case "SearchScreen":
                            return (
                                <Fontisto
                                    color={focused ? PRIMARY_COLOR : ONYX_COLOR}
                                    name={'search'}
                                    style={{}}
                                    size={30}
                                />
                            );
                        case "BookingScreen":
                            return (

                                <MaterialCommunityIcons
                                    color={focused ? PRIMARY_COLOR : ONYX_COLOR}
                                    name={'view-list-outline'}
                                    style={{}}
                                    size={38}
                                />
                            );
                        case "UserScreen":
                            return (
                                <Feather
                                    color={focused ? PRIMARY_COLOR : ONYX_COLOR}
                                    name={'user'}
                                    style={{}}
                                    size={30}
                                />
                            );
                    }
                }
            })}
        >
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
            />
            <Tab.Screen
                name="BookingScreen"
                component={BookingScreen}
            />
            <Tab.Screen
                name="UserScreen"
                component={UserScreen}
            />
        </Tab.Navigator>
    );
};

export default Tabs;