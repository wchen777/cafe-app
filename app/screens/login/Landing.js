import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';

export default function Landing({ navigation }) {
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
                    <View
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10
                        }}
                    >
                        <TextArea placeholder="example@cafe.com" autoCorrect={false}/>
                    </View>

                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        Password
                </Text>
                    <View
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10
                        }}
                    >
                        <TextArea placeholder="********" autoCorrect={false}/>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign In"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            onPress={() => navigation.navigate("SignUp")}
                            enableShadow
                        />
                    </View>

                    <Text
                        style={{
                            fontSize: 16, marginTop: 40, fontWeight: 'bold',
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