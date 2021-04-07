import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';

import * as firebase from 'firebase';

import { signOut } from '../../api/firebase/FirebaseAuth'
import ActionBarHome from '../../components/ActionBarHome';
import MyProfileView from './MyProfileView'
import HomeView from './HomeView';
import ChatView from './ChatView';


export default function MainScreen({ navigation }) {

    const userData = useRef()

    const [selectedPage, setSelectedPage] = useState('Home')


    let currentUserUID = firebase.auth().currentUser.uid;
    // const [userData, setUserData] = useState({});

    async function getUserInfo() {
        let doc = await firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .get();

        if (!doc.exists) {
            Alert.alert('No user data found!')
        } else {
            let dataObj = doc.data();
            // setUserData(dataObj)
            userData.current = dataObj
        }
    }

    useEffect(() => {
        getUserInfo();
    }, [userData])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#FFFDFC', marginBottom: 0, paddingBottom: 0, padding: 0, margin: 0  }}>
                
                {selectedPage === "Home" && 
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <HomeView navigation={navigation}/>
                    </View>
                }

                {selectedPage === "Profile" && <MyProfileView navigation={navigation} userData={userData.current}/>}

                {selectedPage === "Explore" && 
                    <View style={{flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                        <Text> Explore page coming soon!</Text>
                    </View>
                }

                {selectedPage === "Chat" && 
                    <ChatView navigation={navigation}/>
                }

                <ActionBarHome selectedPage={selectedPage} setSelectedPage={setSelectedPage} navigation={navigation}/>

            </View>


        </TouchableWithoutFeedback>
    )
}