import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import MainScreen from '../screens/main/MainScreen'
import HeaderBarLogo from '../components/HeaderBarLogo'

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName='Main'>
            <Stack.Screen
                name='Main'
                component={MainScreen}
                options={{ headerShown: true, headerTitle:  <HeaderBarLogo/> }}
            />
        </Stack.Navigator>
    )
}
