import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native'
import { View, Image, Text, Button, Colors } from 'react-native-ui-lib';

import { signIn } from '../../api/firebase/FirebaseAuth'

export default function Landing({ navigation }) {

    const [login, setLogin] = useState({ email: '', password: '' })

    const onLogin = () => {

        // TODO: validation for email stuff, can create a separate js file for validation functions

        signIn(login)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 90 }}>
                        <Image style={{ width: 120, height: 100 }} source={require('../../img/logo.jpg')} />
                    </View>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 30 }}>Cafe Logo Here</Text>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-50>
                        Email
                    </Text>

                <TextInput placeholder="example@cafe.com" autoCapitalize={false}
                    autoCorrect={false}
                    onChangeText={email => setLogin({ ...login, email: email.trim() })}
                    style={{
                        height: 40,
                        width: 220,
                        borderWidth: 1,
                        borderColor: Colors.dark60,
                        borderRadius: 20,
                        paddingLeft: 10
                    }} 
                />

                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Password
                    </Text>

                    <TextInput
                        placeholder="********"
                        autoCapitalize={false}
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={password => setLogin({ ...login, password: password.trim() })}
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10,
                        }} 
                    />

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign In"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            onPress={() => onLogin()}
                            enableShadow
                        />
                    </View>

                    <Text
                        style={{
                            fontSize: 16, marginTop: 40, fontWeight: 'bold', marginLeft: 28,
                            fontStyle: 'italic', textDecorationLine: 'underline', color: '#0669FC'
                        }}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        Create a new account
                    </Text>

                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}