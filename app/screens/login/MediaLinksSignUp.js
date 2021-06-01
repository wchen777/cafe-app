import React, { useState, useEffect } from 'react';

import { Keyboard, TouchableWithoutFeedback, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { View, Image, Text, TextField, TextInput, TextArea, Button, Colors } from 'react-native-ui-lib';


export default function MediaLinksSignUp({ navigation, route }) {

    const [authData, setAuthData] = useState(route.params)

    const orange = '#f79a43'

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text text40 style={{ textAlign: 'center', fontSize: 30, marginTop: 70 }}>Media Links</Text>
                    <Text text70 dark10 marginB-15 marginT-30>
                        Instagram
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="ig-username" autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={ig => setAuthData({ ...authData, ig: ig })} />
                    </View>
                    <Text text70 dark10 marginB-15 marginT-20>
                        Twitter
                </Text>


                    <View
                    >
                        <TextArea
                            placeholder="twitter-handle"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.input}
                            onChangeText={twitter => setAuthData({ ...authData, twitter: twitter })} />
                    </View>

                    <Text text70 dark10 marginB-15 marginT-20>
                        Portfolio URL
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextInput
                            placeholder="my-portfolio.com"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={portfolio => setAuthData({ ...authData, portfolio: portfolio })} />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Continue"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 170, marginTop: 30 }}
                            onPress={() => navigation.navigate("UsernameSignUp", authData)}
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
        paddingLeft: 10
    },
});