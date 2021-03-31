import React, { useEffect, useState, useContext } from 'react';


import { NavigationContainer } from '@react-navigation/native'

import AuthStack from './AuthStack'
import HomeStack from './HomeStack'

import { AuthContext } from '../context/AuthContext'

import * as firebase from 'firebase';


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

    // splash/loading screen
    // if (loading) {
    //   return <Loading />;
    // }



    return (
        <NavigationContainer>

            { user ? <HomeStack /> : <AuthStack />}

        </NavigationContainer>
    )
}
