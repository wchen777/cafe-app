import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import LandingScreen from '../screens/login/Landing'
import SignUpScreen from '../screens/login/SignUpInitial'
import MediaLinks from '../screens/login/MediaLinksSignUp'

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName='Landing'>
            <Stack.Screen
                name='Landing'
                component={LandingScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='SignUp'
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='MediaLinks'
                component={MediaLinks}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
