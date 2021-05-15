import React, { createContext, useState, useEffect } from 'react'
import * as firebase from "firebase";
import "firebase/firestore";



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({})
    const [authHeader, setAuthHeader] = useState()


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userData,
                setUserData,
                authHeader,
                setAuthHeader
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = createContext({});