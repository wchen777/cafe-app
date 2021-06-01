import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TextInput, StyleSheet } from 'react-native'
import { View, Image, Text, Button, Colors } from 'react-native-ui-lib';

import { signIn } from '../../api/firebase/FirebaseAuth'

export default function Landing({ navigation }) {

    const [login, setLogin] = useState({ email: '', password: '' })

    const orange = '#f79a43'

    const onLogin = () => {

        signIn(login)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
                        <Image style={{ width: 180, height: 180 }} source={require('../../assets/logo-full.png')} />
                    </View>
                    <Text text70 dark10 marginB-15 marginT-50>
                        Email
                </Text>

                    <TextInput text70 placeholder="example@cafe.com" autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={email => setLogin({ ...login, email: email.trim() })}
                        style={styles.inputStyle}
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
                        style={styles.inputStyle}
                    />

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} marginT-40>
                        <Button
                            backgroundColor={orange}
                            label="Sign In"
                            labelStyle={{ fontWeight: '600', fontSize: 17 }}
                            text30
                            borderRadius={10}
                            style={{ width: 200, marginTop: 30, paddingTop: 0, paddingBottom: 0 }}
                            onPress={() => onLogin()}
                            enableShadow
                        />
                    </View>


                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} marginT-5>
                        <Button
                            backgroundColor={"#FFFDFC"}
                            outlineColor={orange}
                            outlineWidth={1}
                            label="Create an account"
                            labelStyle={{ fontWeight: '600', fontSize: 17, color: orange }}
                            text30
                            borderRadius={10}
                            style={{ width: 200, marginTop: 20, paddingTop: 0, paddingBottom: 0,  }}
                            onPress={() => navigation.navigate("SignUp")}
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
    },
});