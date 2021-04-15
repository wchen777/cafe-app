
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
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
  uri: 'http://localhost:443/'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:443/graphql',
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

export default function App() {

    // Initialize Apollo Client
    const client = new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache()
    });

    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(firebaseConfig);
    }


    return (
        <ApolloProvider client={client}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </ApolloProvider>
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
