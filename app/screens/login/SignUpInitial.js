import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, TextInput, Alert, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { View, Image, Text, TextField, TextArea, Button, Colors } from 'react-native-ui-lib';
import { gql, useMutation } from '@apollo/client'


const DUPE_EMAIL = gql`
mutation isDuplicateEmailCheck(
        $email: String!){
    isDuplicateEmailCheck(
            email: $email
    ) 
}
`;


export default function SignUpInitial({ navigation }) {

    const orange = '#f79a43'
    // move all the errors into its own json object
    // ALSO, try and get rid of extra empty space between label and text input when errors are not present
    // right now, i removed the empty space but the errors need to have a line break
    const [errors, setErrors] = useState({});
    const [initialAuth, setInitialAuth] = useState({});
    const [checkDupeEmailResolver] = useMutation(DUPE_EMAIL);

    const initialValidation = async () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let tempErrors = {};
        console.log("here")
        const isDupeEmail = await checkDupeEmailResolver({ variables: { email: initialAuth.email } });
        if (!initialAuth.first) {
            tempErrors.firstMessage = "Please Enter A First Name";
        }

        if (!initialAuth.last) {
            tempErrors.lastMessage = "Please Enter A Last Name";
        }

        if (!initialAuth.email) {
            tempErrors.emailMessage = "Please Enter An Email";
        }
        else if (!re.test(initialAuth.email)) {
            tempErrors.emailMessage = "Please Enter a VALID Email";
        } 
        else if (isDupeEmail.data.isDuplicateEmailCheck) {
            tempErrors.emailMessage = "This email is already taken."
        }

        if (!initialAuth.password) {
            tempErrors.passwordMessage = "Please Enter a Password";
        }
        else if (initialAuth.password.length < 6) {
            tempErrors.passwordMessage = "Password Must Be At Least 6 Characters Long";
        }

        if (!initialAuth.confirmPassword) {
            tempErrors.confirmPasswordMessage = "Please Confirm Your Password";
        }
        else if (initialAuth.password !== initialAuth.confirmPassword) {
            tempErrors.confirmPasswordMessage = "Passwords Must Match";
        }

        // check empty temp errors object
        if (Object.keys(tempErrors).length === 0) {
            navigation.navigate("MediaLinks", initialAuth);
        } 
        else {
            setErrors(tempErrors);
        }
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}
            >
                <View style={{ flexDirection: 'column'}}>
                    <ScrollView>
                        <Text text40 style={{ textAlign: 'center', marginTop: 80, fontSize: 30 }}>Sign Up</Text>

                        <Text text70 dark10 marginB-15 marginT-20 marginR-10>
                            <Text style={{ color: 'red' }}>*</Text> First Name
                        </Text>
                        {errors.firstMessage && <Text style={{ color: 'red' }}>{errors.firstMessage}</Text>}
                        <TextInput
                            placeholder="First Name"
                            autoCorrect={false}
                            onChangeText={first => setInitialAuth({ ...initialAuth, first: first.trim() })}
                            style={styles.inputStyle}
                        />

                        <Text text70 dark10 marginB-15 marginT-15>
                            <Text style={{ color: 'red' }}>*</Text> Last Name
                        </Text>
                        {errors.lastMessage && <Text style={{ color: 'red' }}>{errors.lastMessage}</Text>}
                        <TextInput
                            placeholder="Last Name"
                            autoCorrect={false}
                            onChangeText={last => setInitialAuth({ ...initialAuth, last: last.trim() })}
                            style={styles.inputStyle}
                        />
                        <Text text70 dark10 marginB-15 marginT-15>
                            <Text style={{ color: 'red' }}>*</Text> Email
                        </Text>
                        {errors.emailMessage && <Text style={{ color: 'red' }}>{errors.emailMessage}</Text>}
                        <TextInput
                            placeholder="Email"
                            autoCorrect={false}
                            keyboardType='email-address' 
                            textContentType='emailAddress' 
                            autoCapitalize='none'
                            onChangeText={(email) => setInitialAuth({ ...initialAuth, email: email.trim() })}
                            style={styles.inputStyle}
                        />
                        <Text text70 dark10 marginB-15 marginT-15>
                            <Text style={{ color: 'red' }}>*</Text> Password
                        </Text>
                        {errors.passwordMessage && <Text style={{ color: 'red' }}>{errors.passwordMessage}</Text>}
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
                        {errors.confirmPasswordMessage && <Text style={{ color: 'red' }}>{errors.confirmPasswordMessage}</Text>}
                        <TextInput
                            placeholder="********"
                            autoCapitalize='none'
                            autoCorrect={false}
                            textContentType='password'
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => setInitialAuth({ ...initialAuth, confirmPassword: confirmPassword.trim() })}
                            style={styles.inputStyle}
                        />


                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: 50  }}>
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
                                style={{ width: 200, marginTop: 20 }}
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