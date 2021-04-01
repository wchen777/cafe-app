import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';

import * as firebase from 'firebase';

import { signOut } from '../../api/firebase/FirebaseAuth'

export default function Landing({ navigation }) {

    let currentUserUID = firebase.auth().currentUser.uid;
    const [name, setName] = useState('');

    useEffect(() => {
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
                setName(dataObj.first + " " + dataObj.last)
            }
        }
        getUserInfo();
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 90 }}>
                        <Image style={{ width: 120, height: 100 }} source={require('../../img/logo.jpg')} />
                    </View>

                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 30 }}>
                        Hi {name}!
                    </Text>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign Out"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            onPress={() => signOut()}
                            enableShadow
                        />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}