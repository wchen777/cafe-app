import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client'

import { Keyboard, TouchableWithoutFeedback, TextInput, Alert } from 'react-native'
import { View, Image, Text, TextField, Button, Colors } from 'react-native-ui-lib';

import { registration } from '../../api/firebase/FirebaseAuth'

const REGISTRATION = gql`
    mutation registerUser(
            $username: String!
            $first: String!
            $last: String!
            $email: String!
            $ig: String
            $portfolio: String 
            $twitter: String
            $permissions: String){
        registerUser(             
                username: $username
                first: $first
                last: $last
                email: $email
                ig: $ig
                portfolio: $portfolio
                twitter: $twitter
                permissions: $permissions
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

export default function UsernameSignUp({ navigation, route }) {

    const orange = '#f79a43'

    const [authData, setAuthData] = useState(route.params)

    // use gql mutation with errors
    const [registerUserResolver, { data }] = useMutation(REGISTRATION,
        {
            onError(err) {
                console.log(err)
                Alert.alert("Account registration failed.", "An account exists with the same username or email.");
            },
            onCompleted(data) {
                console.log(data, "completed");
                registration(authData)
            }
        },
    );


    const onSignUp = () => {
        registerUserResolver({ variables: authData })
        console.log(authData)
        // console.log("post resolver")
        // console.log(data)
        // console.log("asdf here")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

                    <Text text40 style={{ textAlign: 'center', fontSize: 30, marginTop: 50, marginBottom: 40 }}>Choose a Username</Text>
                    <View style={{ alignItems: 'center' }}>

                        <View>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder="cafe-user" autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={username => setAuthData({ ...authData, username: username })} />
                        </View>
                    </View>


                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            backgroundColor={orange}
                            label="Sign me up!"
                            borderRadius={10}
                            labelStyle={{ fontWeight: '600', fontSize: 17 }}
                            style={{ width: 200, marginTop: 25 }}
                            onPress={() => onSignUp()}
                            enableShadow
                        />
                        <Button
                            label="Back"
                            backgroundColor="#FFFDFC"
                            outlineColor={orange}
                            borderRadius={10}
                            outlineWidth={1}
                            labelStyle={{ fontWeight: '600', fontSize: 17, color: orange }}
                            style={{ width: 200, marginTop: 20 }}
                            onPress={() => navigation.goBack()}
                            enableShadow
                        />
                    </View>

                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: Colors.dark60,
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 20
    },
});
