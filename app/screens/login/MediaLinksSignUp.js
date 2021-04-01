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
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 50 }}>Media Links</Text>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-30>
                        Instagram
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="ig-username" autoCapitalize={false}
                            autoCorrect={false}
                            onChangeText={ig => setAuthData({ ...authData, ig: ig })}/>
                    </View>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Twitter
                </Text>


                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="twitter-handle" autoCapitalize={false}
                            autoCorrect={false}
                            onChangeText={twitter => setAuthData({ ...authData, twitter: twitter })} />
                    </View>

                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Portfolio URL
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="my-portfolio.com" autoCapitalize={false}
                            autoCorrect={false} 
                            onChangeText={portfolio => setAuthData({ ...authData, portfolio: portfolio })}/>
                    </View>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Extra Links
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="extra-link.com" autoCapitalize={false}
                            autoCorrect={false} 
                            onChangeText={extra1 => setAuthData({ ...authData, extra1: extra1 })}/>
                    </View>

                    <View
                        style={{ ...styles.input, marginTop: 20 }}
                    >
                        <TextArea placeholder="extra-link.com" autoCapitalize={false}
                            autoCorrect={false} 
                            onChangeText={extra2 => setAuthData({ ...authData, extra2: extra2 })}/>
                    </View>

                    <View
                        style={{ ...styles.input, marginTop: 20 }}
                    >
                        <TextArea placeholder="extra-link.com" autoCapitalize={false}
                            autoCorrect={false} 
                            onChangeText={extra3 => setAuthData({ ...authData, extra3: extra3 })}/>
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
        paddingLeft: 10
    },
});