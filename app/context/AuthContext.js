import React, { createContext, useState, useEffect } from 'react'
import * as firebase from "firebase";
import "firebase/firestore";



export const AuthProvider = ({ children }) => {

    // async function getUserInfo() {
    //     let currentUserUID = firebase.auth().currentUser.uid;
    //     let doc = await firebase
    //         .firestore()
    //         .collection('users')
    //         .doc(currentUserUID)
    //         .get();

    //     return doc.data()
    // }

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

//   export const useAuthContext = useContext(AuthContext)