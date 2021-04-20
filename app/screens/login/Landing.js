import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native'
import { View, Image, Text, Button, Colors } from 'react-native-ui-lib';

import { signIn } from '../../api/firebase/FirebaseAuth'

export default function Landing({ navigation }) {

    const [login, setLogin] = useState({ email: '', password: '' })

    const onLogin = () => {

        signIn(login)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 150 }}>
                        <Image style={{ width: 120, height: 100 }} source={require('../../img/logo.jpg')} />
                    </View>
                    <Text text70  dark10 marginB-15 marginT-50>
                        Email
                </Text>

                <TextInput text70 placeholder="example@cafe.com" autoCapitalize='none'
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

                    <Text text70 dark10 marginB-15 marginT-20>
                        Password
                    </Text>

                    <TextInput
                        placeholder="********"
                        autoCapitalize='none'
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

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}} marginT-10>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign In"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            text30
                            style={{ width: 145, marginTop: 30, paddingTop: 0, paddingBottom: 0 }}
                            onPress={() => onLogin()}
                            enableShadow
                        />
                    </View>

                    <Text
                        text40
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