import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TextInput, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';


export default function SignUpInitial({ navigation }) {

    const orange = '#f79a43'

    const [initialAuth, setInitialAuth] = useState({})

    const initialValidation = () => {

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!initialAuth.first || !initialAuth.last
            || !initialAuth.email || !initialAuth.password || !initialAuth.confirmPassword) {
            Alert.alert('Please fill out all required fields.');
        } else if (!re.test(initialAuth.email)) {
            Alert.alert('Invalid email address.');
        } else if (initialAuth.password.length < 6) {
            Alert.alert('Password needs to be longer than 6 characters.');
        } else if (initialAuth.password !== initialAuth.confirmPassword) {
            Alert.alert('Passwords do not match.');
        } else {
            navigation.navigate("MediaLinks", initialAuth);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}
                >
                <View style={{ flexDirection: 'column' }}>
                    <ScrollView>
                        <Text text40 style={{ textAlign: 'center', marginTop: 80, fontSize: 30 }}>Sign Up</Text>

                        <Text text70 dark10 marginB-15 marginT-20 marginR-10>
                            <Text style={{ color: 'red' }}>*</Text> First Name
                    </Text>
                        <TextInput
                            placeholder="First Name"
                            autoCorrect={false}
                            onChangeText={first => setInitialAuth({ ...initialAuth, first: first.trim() })}
                            style={styles.inputStyle}
                        />

                        <Text text70 dark10 marginB-15 marginT-15>
                            <Text style={{ color: 'red' }}>*</Text> Last Name
                    </Text>

                        <TextInput
                            placeholder="Last Name"
                            autoCorrect={false}
                            onChangeText={last => setInitialAuth({ ...initialAuth, last: last.trim() })}
                            style={styles.inputStyle}
                        />
                        <Text text70 dark10 marginB-15 marginT-15>
                            <Text style={{ color: 'red' }}>*</Text> Email
                    </Text>

                        <TextInput
                            placeholder="Email"
                            autoCorrect={false}
                            keyboardType='email-address' textContentType='emailAddress' autoCapitalize='none'
                            onChangeText={(email) => setInitialAuth({ ...initialAuth, email: email.trim() })}
                            style={styles.inputStyle}
                        />
                        <Text text70 dark10 marginB-15 marginT-15>
                            <Text style={{ color: 'red' }}>*</Text> Password
                    </Text>

                        <TextInput
                            placeholder="********"
                            autoCapitalize='none'
                            autoCorrect={false}
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={(password) => setInitialAuth({ ...initialAuth, password: password.trim() })}
                            style={styles.inputStyle}
                        />

                        <Text text70 dark10 marginB-15 marginT-15>
                            <Text style={{ color: 'red' }}>*</Text> Retype Password
                    </Text>

                        <TextInput
                            placeholder="********"
                            autoCapitalize='none'
                            autoCorrect={false}
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => setInitialAuth({ ...initialAuth, confirmPassword: confirmPassword.trim() })}
                            style={styles.inputStyle}
                        />


                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                backgroundColor={orange}
                                label="Continue"
                                borderRadius={10}
                                labelStyle={{ fontWeight: '600', fontSize: 17 }}
                                style={{ width: 200, marginTop: 30 }}
                                onPress={() => initialValidation()}
                                enableShadow
                            />
                            <Button
                                backgroundColor="#FFFDFC"
                                outlineColor={orange}
                                borderRadius={10}
                                outlineWidth={1}
                                label="Back"
                                labelStyle={{ fontWeight: '600', fontSize: 17, color: orange }}
                                style={{ width: 200, marginTop: 30 }}
                                onPress={() => navigation.goBack()}
                                enableShadow
                            />
                        </View>

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
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