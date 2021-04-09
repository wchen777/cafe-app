import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, Wizard, Card } from 'react-native-ui-lib';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function TextPost({ setContent }) {

    return (
        <TouchableWithoutFeedback marginT-13 onPress={Keyboard.dismiss}>
            <View >


                <Text text40 style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }}
                    marginB-13>
                    <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 20}} marginB-13 color={Colors.red40}>* </Text>Enter your thoughts:
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                    <TextInput
                        backgroundColor="#ffffff"
                        text50
                        floatOnFocus
                        placeholder="Start typing or paste text!"
                        width="90%"
                        onChangeText={(t) => setContent(t)}
                        multiline={true}
                        style={{ paddingTop: 10, paddingHorizontal: 10, minHeight: 400, marginBottom: 25 }}
                    />
                </View>
            </View>

        </TouchableWithoutFeedback>
    )
}
