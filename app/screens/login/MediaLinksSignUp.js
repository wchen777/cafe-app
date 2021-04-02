import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';

import { registration } from '../../api/firebase/FirebaseAuth'


export default function MediaLinksSignUp({ navigation, route }) {

    const [authData, setAuthData] = useState(route.params)

    console.log(authData)

    const onSignUp = () => {

        // TODO: validation, password encryption, password hiding
        registration(authData)
        
    }


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
                            onChangeText={ig => setAuthData({ ...authData, ig: ig })}/>
                    </View>
                    <Text text70 dark10 marginB-15 marginT-20>
                        Twitter
                </Text>


                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="twitter-handle" autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={twitter => setAuthData({ ...authData, twitter: twitter })} />
                    </View>

                    <Text text70 dark10 marginB-15 marginT-20>
                        Portfolio URL
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="my-portfolio.com" autoCapitalize="none"
                            autoCorrect={false} 
                            onChangeText={portfolio => setAuthData({ ...authData, portfolio: portfolio })}/>
                    </View>
                    
                    {/* <Text text70 dark10 marginB-15 marginT-20>
                        Extra Links
                    </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="extra-link.com" autoCapitalize="none"
                            autoCorrect={false} 
                            onChangeText={extra1 => setAuthData({ ...authData, extra1: extra1 })}/>
                    </View>

                    <View
                        style={{ ...styles.input, marginTop: 20 }}
                    >
                        <TextArea placeholder="extra-link.com" autoCapitalize="none"
                            autoCorrect={false} 
                            onChangeText={extra2 => setAuthData({ ...authData, extra2: extra2 })}/>
                    </View>

                    <View
                        style={{ ...styles.input, marginTop: 20 }}
                    >
                        <TextArea placeholder="extra-link.com" autoCapitalize='none'
                            autoCorrect={false} 
                            onChangeText={extra3 => setAuthData({ ...authData, extra3: extra3 })}/>
                    </View> */}

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