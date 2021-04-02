import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'

import MainScreen from '../screens/main/MainScreen'
import PostViewScreen from '../screens/main/PostViewScreen'
import HeaderBarLogo from '../components/header/HeaderBarLogo'
import HeaderBack from '../components/header/HeaderBack'

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
            <Stack.Screen
                name='PostView'
                component={PostViewScreen}
                options={{ headerShown: true, headerTitle: <HeaderBarLogo/>, headerBackTitleVisible: false,
                    headerTintColor: "orange", headerBackImage: () => <HeaderBack/>}}
            />
        </Stack.Navigator>
    )
}
