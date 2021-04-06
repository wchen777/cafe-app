import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer, TextField} from 'react-native-ui-lib';
import { MainScreen } from '../main/MainScreen';
import * as firebase from "firebase";
import "firebase/firestore";
import { updateProfile } from '../../api/firebase/FirebaseAuth';
import { signOut } from '../../api/firebase/FirebaseAuth'

export default function EditProfile({ route, navigation }) {
    const lightOrange = '#ffdfc2'
    let userData = route.params;

    //const [userData, setAuthData] = useState(route.params)

    const getInitials = () => {
        return userData.userData.first.toUpperCase().charAt(0) + userData.userData.last.toUpperCase().charAt(0)
    } 

    const changeFirst = (first) => {
        userData.userData.first = first;
    }

    const changeLast = (last) => {
        userData.userData.last = last;
    }

    const changePortfolio = (portfolio) => {
        userData.userData.portfolio = portfolio;
    }

    const changeBio = (bio) => {
        userData.userData.bio = bio;
    }

    const editProfile = () => {
        updateProfile(userData.userData);
    }



    return (
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
                            onChangeText={first => changeFirst(first)} 
                            style={{
                                height: 40,
                                width: 220,
                                borderWidth: 1,
                                borderColor: Colors.dark60,
                                borderRadius: 20,
                                paddingLeft: 10
                            }}
                        />

                        <Text text70 dark10 marginB-15 marginT-20>
                            Last Name
                        </Text>
                        <TextInput
                            placeholder="Last Name"
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={last => changeLast(last)} 
                            style={{
                                height: 40,
                                width: 220,
                                borderWidth: 1,
                                borderColor: Colors.dark60,
                                borderRadius: 20,
                                paddingLeft: 10
                            }}
                        />

                        <Text text70 dark10 marginB-15 marginT-20>
                            Portfolio URL
                        </Text>
                        <TextInput
                            placeholder="my-portfolio.com"
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={portfolio => changePortfolio(portfolio)} 
                            style={{
                                height: 40,
                                width: 220,
                                borderWidth: 1,
                                borderColor: Colors.dark60,
                                borderRadius: 20,
                                paddingLeft: 10
                            }}
                        />

                        <Text text70 dark10 marginB-15 marginT-20>
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
                        />
                    </View>

                    <Button
                        backgroundColor="#FFB36C"
                        label="Submit"
                        labelStyle={{ fontWeight: '600', fontSize: 20 }}
                        style={{ width: 145, marginTop: 30}}
                        enableShadow
                        onPress={() => editProfile()}
                    />
                    <Button
                        backgroundColor="#FFB36C"
                        label="Sign Out"
                        labelStyle={{ fontWeight: '600', fontSize: 20 }}
                        style={{ width: 145, marginTop: 20}}
                        onPress={() => signOut()}
                        enableShadow
                    />
                </View>
        </View>

    )
}

const styles = StyleSheet.create({
    centering: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
});