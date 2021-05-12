
import React, { useEffect, useState, useContext } from 'react';
import { AuthProvider, useAuthContext } from './context/AuthContext'
import { firebaseConfig } from './config/Firebase'
import * as firebase from 'firebase';
import ApolloWrapper from './ApolloWrapper';

export default function App() {
    // Initialize Apollo Client

    if (!firebase.apps.length) {
        console.log('Connected with Firebase')
        firebase.initializeApp(firebaseConfig);
    }

    return (
      <AuthProvider>
        <ApolloWrapper/>
      </AuthProvider>
    );
}
