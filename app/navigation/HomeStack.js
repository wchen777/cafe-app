import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import MainScreen from '../screens/main/MainScreen'

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName='Main'>
            <Stack.Screen
                name='Main'
                component={MainScreen}
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    )
}
