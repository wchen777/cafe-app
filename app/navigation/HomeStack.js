import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer } from 'react-native-ui-lib'

import MainScreen from '../screens/main/MainScreen'
import PostViewScreen from '../screens/main/PostViewScreen'
import EditProfileScreen from '../screens/main/EditProfile'
import EditBioScreen from '../screens/main/EditBio'
import HeaderBarLogo from '../components/header/HeaderBarLogo'
import HeaderBack from '../components/header/HeaderBack'
import CreatePostMain from '../screens/main/create-post/CreatePostMain';
import CreatePatio from '../screens/main/patio/CreatePatio'


import { CardStyleInterpolators } from '@react-navigation/stack'

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator
            initialRouteName='Main'>
            <Stack.Screen
                name='Main'
                component={MainScreen}
                options={{ headerShown: true, headerTitle: <HeaderBarLogo /> }}
            />
            <Stack.Screen
                name='PostView'
                component={PostViewScreen}
                options={{
                    headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
                    headerTintColor: "orange", headerBackImage: () => <HeaderBack />
                }}
            />
            <Stack.Screen
                name='EditProfile'
                component={EditProfileScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false, headerBackImage: () => <HeaderBack />,
                    headerTitle:
                        <Text text60 color={Colors.orange30} >
                            Edit Profile </Text>
                }}
            />
            <Stack.Screen
                name='EditBio'
                component={EditBioScreen}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false, headerBackImage: () => <HeaderBack />,
                    headerTitle:
                        <Text text60 color={Colors.orange30} >
                            Edit Bio</Text>
                }}
            />
            <Stack.Screen
                name='CreatePostMain'
                component={CreatePostMain}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false, headerBackImage: () => <></>,
                    headerTitle: <HeaderBarLogo />,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                    gestureDirection: "vertical"
                }}
            />
            <Stack.Screen
                name='CreatePatio'
                component={CreatePatio}
                options={{
                    headerShown: true,
                    headerBackTitleVisible: false, headerBackImage: () => <HeaderBack />,
                    headerTitle: <HeaderBarLogo />,
                }}
            />
        </Stack.Navigator>
    )
}
