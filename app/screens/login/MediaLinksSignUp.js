import React, { useState, useEffect } from 'react';

import { Keyboard, TouchableWithoutFeedback, StyleSheet, TextInput, KeyboardAvoidingView } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';


export default function MediaLinksSignUp({ navigation, route }) {

    const [authData, setAuthData] = useState(route.params)

    const orange = '#f79a43'

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text text40 style={{ textAlign: 'center', fontSize: 30, marginTop: 120 }}>Media Links</Text>
                    <Text text70 dark10 marginB-15 marginT-30>
                        Instagram
                </Text>

                    <View>
                        <TextInput 
                            placeholder="ig-username" autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputStyle}
                            onChangeText={ig => setAuthData({ ...authData, ig: ig })} />
                    </View>
                    <Text text70 dark10 marginB-15 marginT-20>
                        Twitter
                </Text>


                    <View>
                        <TextInput
                            placeholder="twitter-handle"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputStyle}
                            onChangeText={twitter => setAuthData({ ...authData, twitter: twitter })} />
                    </View>

                    <Text text70 dark10 marginB-15 marginT-20>
                        Portfolio URL
                </Text>

                    <View>
                        <TextInput
                            placeholder="my-portfolio.com"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={styles.inputStyle}
                            onChangeText={portfolio => setAuthData({ ...authData, portfolio: portfolio })} />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} marginT-20>
                        <Button
                            backgroundColor={orange}
                            label="Continue"
                            borderRadius={10}
                            labelStyle={{ fontWeight: '600', fontSize: 17 }}
                            style={{ width: 200, marginTop: 30 }}
                            onPress={() => navigation.navigate("UsernameSignUp", authData)}
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
    },
});