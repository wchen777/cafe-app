import React, { useState, useContext, useRef, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import Moment from 'moment';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import {
    View,
    Image,
    Text,
    TextField,
    TextArea,
    Button,
    Colors,
    Wizard,
    Card,
    Toast,
} from 'react-native-ui-lib';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import HeaderX from '../../../components/header/HeaderX';

import { AuthContext } from '../../../context/AuthContext';
import * as firebase from 'firebase';
import ProfileBar from '../../../components/create/ProfileBar';

export default function CreatePostMain({ navigation }) {
    const { userData, setUserData } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: (
                <Text text60 color={Colors.orange30}>
                    Create Post
                </Text>
            ),
            headerBackTitleVisible: false,
            headerBackImage: () => <HeaderX />,
            // headerRight: 'Post',
        });
    });

    let currentUserUID = firebase.auth().currentUser.uid;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignContent: 'center',
                    backgroundColor: '#FFFDFC',
                }}
            >
                <ScrollView>
                    <ProfileBar userData={userData} />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
}
