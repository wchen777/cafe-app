import React, { useEffect, useState, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import HomeStack from './HomeStack'

import SplashScreen from '../screens/SplashScreen'

import { AuthContext } from '../context/AuthContext'

import * as firebase from 'firebase';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function Routes() {


    // refactor this somewhere else

    const { user, setUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    const onAuthStateChanged = (user) => {

        setUser(user);
        if (initializing) setInitializing(false);

        setLoading(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    useEffect(() => {
        changeScreenOrientation();
    }, [])


    // splash/loading screen
    if (loading) {
        return <SplashScreen />;
    }

    
    return (
        <NavigationContainer>

            { user ? <HomeStack /> : <AuthStack />}

        </NavigationContainer>
    )
}
