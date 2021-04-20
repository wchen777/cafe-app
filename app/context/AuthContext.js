import React, { createContext, useState, useEffect } from 'react'
import * as firebase from "firebase";
import "firebase/firestore";



export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({})


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                userData,
                setUserData
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const AuthContext = createContext({});