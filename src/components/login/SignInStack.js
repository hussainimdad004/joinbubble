import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginView from './Login'


const Stack = createStackNavigator()

export default function SignInStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="LoginView" component={LoginView} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}