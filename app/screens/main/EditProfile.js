import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer, TextField } from 'react-native-ui-lib';
import { MainScreen } from '../main/MainScreen';
import * as firebase from "firebase";
import "firebase/firestore";
import { updateProfile } from '../../api/firebase/FirebaseAuth';
import { signOut } from '../../api/firebase/FirebaseAuth'
import { ScrollView } from 'react-native-gesture-handler';


export default function EditProfile({ route, navigation}) {
    const lightOrange = '#ffdfc2'
    let userData = route.params;

    const [userDataC, setUserDataC] = useState(route.params)

    const getInitials = () => {
        return userData.first.toUpperCase().charAt(0) + userData.last.toUpperCase().charAt(0)
    }

    // const changeFirst = (first) => {
    //     userData.first = first;
    // }

    // const changeLast = (last) => {
    //     userData.last = last;
    // }

    // const changePortfolio = (portfolio) => {
    //     userData.portfolio = portfolio;
    // }

    // const changeBio = (bio) => {
    //     userData.bio = bio;
    // }

    const editProfile = () => {
        updateProfile(userDataC);
        // might have to set the state here
        route.params = userDataC
        navigation.goBack()
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>
                    <View style={{ ...styles.centering, marginTop: 20 }}>

                        <Avatar size={100} label={getInitials()} labelColor={Colors.orange30} backgroundColor={lightOrange} />

                        <View style={{ flexDirection: 'column' }}>



                            <Text text70 dark10 marginB-15 marginT-20>
                                First Name
                            </Text>
                            <TextInput
                                placeholder="First Name"
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={userData.first}
                                onChangeText={first => setUserDataC({ ...userDataC, first: first })}
                                style={styles.input}
                            />

                            <Text text70 dark10 marginB-15 marginT-20>
                                Last Name
                            </Text>
                            <TextInput
                                placeholder="Last Name"
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={userData.last}
                                onChangeText={last => setUserDataC({ ...userDataC, last: last })}
                                style={styles.input}
                            />

                            <Text text70 dark10 marginB-15 marginT-20>
                                Portfolio URL
                            </Text>
                            <TextInput
                                placeholder="my-portfolio.com"
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={userData.portfolio}
                                onChangeText={portfolio => setUserDataC({ ...userDataC, portfolio: portfolio })}
                                style={styles.input}
                            />
                            <Text text70 dark10 marginB-15 marginT-20>
                                Instagram
                            </Text>
                            <TextInput
                                placeholder="my-portfolio.com"
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={userData.ig}
                                onChangeText={ig => setUserDataC({ ...userDataC, ig: ig })}
                                style={styles.input}
                            />

                            <Text text70 dark10 marginB-15 marginT-20>
                                Twitter
                            </Text>
                            <TextInput
                                placeholder="my-portfolio.com"
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={userData.twitter}
                                onChangeText={twit => setUserDataC({ ...userDataC, twit: twit })}
                                style={styles.input}
                            />

                            {/* <Text text70 dark10 marginB-15 marginT-20>
                            Bio
                        </Text>
                        <TextInput
                            placeholder="Bio"
                            autoCorrect={false}
                            onChangeText={bio => changeBio(bio)}
                            style={{
                                height: 40,
                                width: 220,
                                borderWidth: 1,
                                borderColor: Colors.dark60,
                                borderRadius: 20,
                                paddingLeft: 10
                            }}
                        /> */}

                        </View>


                        <Button
                            backgroundColor="#FFB36C"
                            label="Save Edits"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            enableShadow
                            onPress={() => editProfile()}
                        />
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign Out"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 20 }}
                            onPress={() => signOut()}
                            enableShadow
                        />

                    </View>
                </View>

                <View style={{height: 100}}/>

            </ScrollView>
        </TouchableWithoutFeedback >

    )
}

const styles = StyleSheet.create({
    centering: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }, input: {
        height: 40,
        width: 220,
        borderWidth: 1,
        borderColor: Colors.dark60,
        borderRadius: 20,
        paddingLeft: 10
    }
});