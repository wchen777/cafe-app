import React, { useEffect, useState, useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import HomeStack from './HomeStack'

import SplashScreen from '../screens/SplashScreen'

import { AuthContext } from '../context/AuthContext'

import * as firebase from 'firebase';
import * as ScreenOrientation from 'expo-screen-orientation';


export default function Routes() {

    const { user, setUser, setAuthHeader } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    // Handle user state changes
    const onAuthStateChanged = (usr) => {
        setUser(usr);

        if (initializing) setInitializing(false);

        setLoading(false);
    }

    // Handle token state changes
    const onIdTokenChanged = (usr) => {
        // set auth header in context
        if (usr) {
            firebase.auth().currentUser.getIdToken(true)
            .then((token) => {
                setAuthHeader(token)
            })
        }
    }


    useEffect(() => {
        changeScreenOrientation();
        const subscriberAuth = firebase.auth().onAuthStateChanged(onAuthStateChanged);

        return subscriberAuth; // unsubscribe on unmount
    }, []);

    useEffect(() => {
        const subscriberToken = firebase.auth().onIdTokenChanged(onIdTokenChanged);

        return subscriberToken; // unsubscribe on unmount

    }, [])



    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }


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
