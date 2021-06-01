import React, { useState, useEffect, useRef, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import { View, Button, Avatar, Colors, Text, Card, TextField, Constants, Drawer } from 'react-native-ui-lib';
import { MainScreen } from './MainScreen';
import * as firebase from "firebase";
import "firebase/firestore";
import { updateProfile } from '../../api/firebase/FirebaseAuth';

import { AuthContext } from '../../context/AuthContext'
import { gql, useMutation } from '@apollo/client'


const EDIT_PROFILE = gql`
    mutation editUserProfile(
            $username: String!
            $first: String
            $last: String
            $ig: String
            $portfolio: String 
            $twitter: String
            $bio: String
            $pic: String){
        editUserProfile(             
                username: $username
                first: $first
                last: $last
                ig: $ig
                portfolio: $portfolio
                twitter: $twitter
                bio: $bio
                pic: $pic
            ){
                username
                id
                first
                last
                email
                ig
                portfolio
                twitter
                following
                followers
                liked
                chats
                bio 
                pic 
                permissions
        }
    }
`

export default function EditBio({ route, navigation }) {
    const orange = '#f79a43'

    const [userDataC, setUserDataC] = useState(userData)

    const { userData, setUserData, authHeader } = useContext(AuthContext)

    const [editUserProfileResolver, { data }] = useMutation(EDIT_PROFILE, {
        variables: userDataC,
        onError(err){
            console.log(err.graphQLErrors[0].extensions.errors)
        },
        context: {
            headers: {
                "Content-Type": "application/json",
                "authorization": authHeader
            }
        }
    });

    const editBio = () => {
        // updateProfile(userDataC);
        editUserProfileResolver(userDataC)
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
                            backgroundColor={orange}
                            borderRadius={10}
                            labelStyle={{ fontWeight: '600', fontSize: 17 }}
                            style={{ width: 200, marginTop: 30 }}
                            label="Save Bio"
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