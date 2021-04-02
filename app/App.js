
import React, { useEffect, useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
// import auth from '@react-native-firebase/auth';

import LandingScreen from './screens/login/Landing';
import SignUpScreen from './screens/login/SignUpInitial';
import MediaLinks from './screens/login/MediaLinksSignUp';

import AuthStack from './navigation/AuthStack'
import HomeStack from './navigation/HomeStack'

import { AuthProvider, useAuthContext } from './context/AuthContext'

import Routes from './navigation/Routes'

import { firebaseConfig } from './config/Firebase'

import * as firebase from 'firebase';


export default function App() {

    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(firebaseConfig);
    }
    

    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });
