import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';


export default function MediaLinks({ navigation, route }) {

    const [authData, setAuthData] = useState(route.params)

    console.log(authData)


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 80 }}>Media Links</Text>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-40>
                        Instagram
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="ig-username" autoCorrect={false} />
                    </View>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Twitter
                </Text>


                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="twitter-handle" autoCorrect={false} />
                    </View>

                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Portfolio URL
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="my-portfolio.com" autoCorrect={false} />
                    </View>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Extra Links
                </Text>

                    <View
                        style={styles.input}
                    >
                        <TextArea placeholder="extra-link.com" autoCorrect={false} />
                    </View>

                    <View
                        style={{ ...styles.input, marginTop: 20 }}
                    >
                        <TextArea placeholder="extra-link.com" autoCorrect={false} />
                    </View>

                    <View
                        style={{ ...styles.input, marginTop: 20 }}
                    >
                        <TextArea placeholder="extra-link.com" autoCorrect={false} />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign me up!"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 170, marginTop: 30 }}
                            onPress={() => navigation.navigate("MediaLinks")}
                            enableShadow
                        />
                        <Button
                            backgroundColor="#FFB36C"
                            label="Back"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
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