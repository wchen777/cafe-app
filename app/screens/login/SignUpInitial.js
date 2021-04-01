import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TextInput, Alert } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';


export default function SignUpInitial({ navigation }) {

    const [initialAuth, setInitialAuth] = useState({})

    const initialValidation = () => {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(initialAuth.email)) {
            Alert.alert('Email is invalid');
        } else if (initialAuth.password.length < 6) {
            Alert.alert('Password needs to be longer than 6 characters.');
        } else if (initialAuth.password !== initialAuth.confirmPassword) {
            Alert.alert('Passwords do not match.');
        } else if (!initialAuth.first || !initialAuth.last 
                    || !initialAuth.email || !initialAuth.password || !initialAuth.confirmPassword) {
            Alert.alert('Please fill out all required fields');
        } else {
            navigation.navigate("MediaLinks", initialAuth);
        }
    }

    console.log(initialAuth)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 80 }}>Sign Up</Text>

                        <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-20 marginR-10>
                             <Text style={{ color: 'red' }}>*</Text> First Name 
                        </Text>
                    <TextInput 
                        placeholder="First Name" 
                        autoCorrect={false}
                        onChangeText={first => setInitialAuth({ ...initialAuth, first: first.trim() })}
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10
                        }} 
                    />

                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
                        <Text style={{ color: 'red' }}>*</Text> Last Name
                    </Text>

                    <TextInput 
                        placeholder="Last Name" 
                        autoCorrect={false}
                        onChangeText={last => setInitialAuth({ ...initialAuth, last: last.trim() })}
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10
                        }}
                    />
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
                        <Text style={{ color: 'red' }}>*</Text> Email
                    </Text>

                    <TextInput 
                        placeholder="Email"
                        autoCorrect={false}
                        keyboardType='email-address' textContentType='emailAddress' autoCapitalize={false}
                        onChangeText={(email) => setInitialAuth({ ...initialAuth, email: email.trim() })} 
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10
                        }}
                    />
                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
                        <Text style={{ color: 'red' }}>*</Text> Password
                    </Text>

                    <TextInput 
                        placeholder="********" 
                        autoCapitalize={false}
                        autoCorrect={false}
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={(password) => setInitialAuth({ ...initialAuth, password: password.trim() })}
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10
                        }}
                    />

                    <Text style={{ fontSize: 15 }} dark10 marginB-15 marginT-15>
                        <Text style={{ color: 'red' }}>*</Text> Retype Password
                    </Text>

                    <TextInput 
                        placeholder="********"
                        autoCapitalize={false}
                        autoCorrect={false}
                        textContentType='password'
                        secureTextEntry={true}
                        onChangeText={(confirmPassword) => setInitialAuth({ ...initialAuth, confirmPassword: confirmPassword.trim() })}
                        style={{
                            height: 40,
                            width: 220,
                            borderWidth: 1,
                            borderColor: Colors.dark60,
                            borderRadius: 20,
                            paddingLeft: 10
                        }}
                    />


                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Continue"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            onPress={() => initialValidation()}
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