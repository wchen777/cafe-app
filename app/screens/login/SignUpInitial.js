import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';

export default function SignUpInitial({ navigation }) {

    const [initialAuth, setInitialAuth] = useState({})

    const initialValidation = () => {
        // TODO: initial validation for inputs

        // correct email form
        // password > 6 charactesr

        // also add red stars for required fields
    }

    console.log(initialAuth)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 80 }}>Sign Up</Text>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20>
                        First Name
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
                        <TextArea placeholder="First Name" 
                            autoCorrect={false}
                            onChangeText={first => setInitialAuth({ ...initialAuth, first: first })} />
                    </View>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
                        Last Name
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
                        <TextArea placeholder="Last Name" 
                            autoCorrect={false}
                            onChangeText={last => setInitialAuth({ ...initialAuth, last: last })} />
                    </View>
                    {/* <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
                    Date of Birth
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
                    <TextArea placeholder="mm/dd/yy"
                    onChangeText={(email) => setInitialAuth({...initialAuth, email: email})}/>
                </View> */}
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
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
                        <TextArea placeholder="Email"
                            autoCorrect={false}
                            keyboardType='email-address' textContentType='emailAddress'
                            onChangeText={(email) => setInitialAuth({ ...initialAuth, email: email })} />
                    </View>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
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
                        <TextArea placeholder="********" 
                            autoCorrect={false}
                            textContentType='password'
                            onChangeText={(password) => setInitialAuth({ ...initialAuth, password: password })} />
                    </View>
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
                        Retype Password
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
                        <TextArea placeholder="********" 
                            autoCorrect={false}
                            textContentType='password'
                            onChangeText={(confirmPassword) => setInitialAuth({ ...initialAuth, confirmPassword: confirmPassword })} />
                    </View>

                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Continue"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            onPress={() => navigation.navigate("MediaLinks", initialAuth)}
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