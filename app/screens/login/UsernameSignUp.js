import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client'

import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';

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

    const [authData, setAuthData] = useState(route.params)

    const [registerUserResolver, { data }] = useMutation(REGISTRATION);


    const onSignUp = () => {
        registerUserResolver({variables: authData})
        console.log(authData)
        console.log("post resolver")

        registration(authData)
        console.log("asdf here")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>

                    <Text text40 style={{ textAlign: 'center', fontSize: 30, marginTop: 70 }}>Choose a Username</Text>
                    <View style={{ alignItems: 'center' }}>

                        <View
                            style={styles.input}
                        >
                            <TextArea placeholder="cafe-user" autoCapitalize='none'
                                autoCorrect={false}
                                onChangeText={username => setAuthData({ ...authData, username: username })} />
                        </View>
                    </View>


                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign me up!"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 170, marginTop: 25 }}
                            onPress={() => onSignUp()}
                            enableShadow
                        />
                        <Button
                            backgroundColor="#FFB36C"
                            label="Back"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 20 }}
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
    input: {
        height: 40,
        width: 220,
        borderWidth: 1,
        borderColor: Colors.dark60,
        borderRadius: 20,
        paddingLeft: 10,
        marginTop: 40,
        marginBottom: 20
    },
});
