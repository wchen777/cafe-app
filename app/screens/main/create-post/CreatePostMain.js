import React, { useState, useContext, useRef, useEffect } from 'react';
import { StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import Moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
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
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
} from 'react-native-gesture-handler';
import { v4 as uuidv4 } from 'uuid';
import HeaderX from '../../../components/header/HeaderX';

import { AuthContext } from '../../../context/AuthContext';
import * as firebase from 'firebase';
import ProfileBar from '../../../components/create/ProfileBar';
import { orange } from '../../../styles/Colors';

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

                <KeyboardAvoidingView behavior="padding" style={styles.toolbar}>
                    <TouchableOpacity style={styles.toolButton}>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                marginHorizontal: 16,
                            }}
                        >
                            <Ionicons
                                name="md-image"
                                size={35}
                                color={Colors.red30}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolButton}>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                marginHorizontal: 16,
                            }}
                        >
                            <Foundation
                                name="sound"
                                size={35}
                                color={Colors.green30}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.toolButton}>
                        <View
                            style={{
                                paddingHorizontal: 16,
                                marginHorizontal: 16,
                            }}
                        >
                            <Entypo
                                name="link"
                                size={35}
                                color={Colors.blue30}
                            />
                        </View>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#ffffff',
        paddingBottom: 16,
        height: 88,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        shadowColor: '#757575',
        shadowOpacity: 0.4,
        paddingTop: 12,
        paddingHorizontal: 8,
        // ,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    toolButton: {
        // height: 56,
        // width: 56,
    },
});
