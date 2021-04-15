import React, { useState, useEffect, useRef, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import { View, Button, Avatar, Colors, Text, Card, TextField, Constants, Drawer } from 'react-native-ui-lib';
import { MainScreen } from '../main/MainScreen';
import * as firebase from "firebase";
import "firebase/firestore";
import { updateProfile } from '../../api/firebase/FirebaseAuth';

import { AuthContext } from '../../context/AuthContext'

export default function EditBio({ route, navigation }) {
    const lightOrange = '#ffdfc2'

    const { userData, setUserData } = useContext(AuthContext)

    const [userDataC, setUserDataC] = useState(userData)

    const editBio = () => {
        updateProfile(userDataC);
        setUserData(userDataC)
        navigation.goBack()
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ ...styles.centering, marginTop: 20 }}>
                <ScrollView>
                    <TextField
                        text70
                        floatingPlaceholder
                        defaultValue={userData.bio}
                        onChangeText={(bio) => setUserDataC({ ...userDataC, bio: bio })}
                        width="80%"
                        style={{ minHeight: 150, marginTop: 0, paddingTop: 0, marginHorizontal: 10, paddingHorizontal: 10 }}
                        floatOnFocus
                        multiline={true}
                    />

                    <View style={styles.centering}>


                        <Button
                            backgroundColor="#FFB36C"
                            label="Save Bio"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            enableShadow
                            onPress={() => editBio()}
                        />
                    </View>

                    {/* whitespace block */}
                    <View style={{ height: 40 }} />


                </ScrollView>





            </View>

        </TouchableWithoutFeedback >

    )
}

const styles = StyleSheet.create({
    centering: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
});