import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer, TextField, ActionSheet} from 'react-native-ui-lib';
import { MainScreen } from '../main/MainScreen';
import * as firebase from "firebase";
import "firebase/firestore";
import { updateProfile } from '../../api/firebase/FirebaseAuth';
import { signOut } from '../../api/firebase/FirebaseAuth'
import { ScrollView } from 'react-native-gesture-handler';
import { AuthContext } from '../../context/AuthContext'
import { updatePic } from '../../api/firebase/FirebaseAuth'
import { gql, useMutation } from '@apollo/client'

const EDIT_PROFILE = gql`
    mutation editUserProfile(
            $username: String!
            $first: String
            $last: String
            $ig: String
            $portfolio: String 
            $twitter: String
            $bio: String
            $pic: String){
        editUserProfile(             
                username: $username
                first: $first
                last: $last
                ig: $ig
                portfolio: $portfolio
                twitter: $twitter
                bio: $bio
                pic: $pic
            ){
                username
                id
                first
                last
                email
                ig
                portfolio
                twitter
                following
                followers
                liked
                chats
                bio 
                pic 
                permissions
        }
    }
`

export default function EditProfile({ navigation }) {
    const lightOrange = '#ffdfc2'
    const orange = '#f79a43'

    const { userData, setUserData, authHeader } = useContext(AuthContext)

    const [userDataC, setUserDataC] = useState({})
    console.log("copy", userDataC)

    const [showSheet, setShowSheet] = useState(false);


    const [editUserProfileResolver, { data }] = useMutation(EDIT_PROFILE, {
        variables: {...userDataC, username: userData.username},
        onError(err){
            console.log(err.graphQLErrors[0].extensions.errors)
        },
        context: {
            headers: {
                "Content-Type": "application/json",
                "authorization": authHeader
            }
        }
    });

    const getInitials = () => {
        return userData.first.toUpperCase().charAt(0) + userData.last.toUpperCase().charAt(0)
    }

    const onPlaceholderPress = () => {
        if (showSheet) {
            setShowSheet(!showSheet)
        }
        setShowSheet(!showSheet)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setUserDataC({ ...userDataC, pic: result.uri })
            updatePic(result.uri)
        }

        setShowSheet(false)
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const editProfile = () => {
        editUserProfileResolver()
        setUserData({...userData, ...userDataC})
        navigation.goBack()
    }



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView>
                <ActionSheet
                        title='Select Image'
                        message='Image'
                        cancelButtonIndex={3}
                        useNativeIOS={false}
                        options={[{
                            label: 'Upload Image from Camera Roll', onPress: () => {
                                pickImage()
                            }
                        },
                        { label: 'Cancel', onPress: () => setShowSheet(false) },
                        ]}
                        visible={showSheet}
                        containerStyle={{ paddingBottom: 25 }}
                />
                <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>
                    <View style={{ ...styles.centering, marginTop: 20 }}>

                    {userData.pic === "" ?
                        <Avatar
                            size={100}
                            label={getInitials()}
                            labelColor={Colors.orange30}
                            backgroundColor={lightOrange}
                            badgeProps= {{label: "+", size: 'large', borderWidth: 0.0, backgroundColor: orange}}
                            badgePosition= 'BOTTOM_RIGHT'
                            onPress={() => onPlaceholderPress()}
                            />
                        :
                        <Avatar
                            size={100}
                            source={{ uri: userDataC.pic }}
                            badgeProps= {{label: "+", size: 'large', borderWidth: 0.0, backgroundColor: orange}}
                            badgePosition= 'BOTTOM_RIGHT'
                            onPress={() => onPlaceholderPress()} />
                    }

                        <View style={{ flexDirection: 'column' }}>



                            <Text text70 dark10 marginB-6 marginT-12>
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

                            <Text text70 dark10 marginB-6 marginT-12>
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

                            <Text text70 dark10 marginB-6 marginT-12>
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
                            <Text text70 dark10 marginB-6 marginT-12>
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

                            <Text text70 dark10 marginB-6 marginT-12>
                                Twitter
                            </Text>
                            <TextInput
                                placeholder="my-portfolio.com"
                                autoCapitalize='none'
                                autoCorrect={false}
                                defaultValue={userData.twitter}
                                onChangeText={twitter => setUserDataC({ ...userDataC, twitter: twitter })}
                                style={styles.input}
                            />

                        </View>


                        <Button
                            label="Save Edits"
                            backgroundColor={orange}
                            borderRadius={10}
                            labelStyle={{ fontWeight: '600', fontSize: 17 }}
                            style={{ width: 200, marginTop: 30 }}
                            enableShadow
                            onPress={() => editProfile()}
                        />
                        <Button
                            backgroundColor={'rgba(52, 52, 52, 0.0)'}
                            outlineColor={orange}
                            borderRadius={10}
                            outlineWidth={1}
                            label="Sign Out"
                            labelStyle={{ fontWeight: '600', fontSize: 17, color: orange }}
                            style={{ width: 200, marginTop: 20 }}
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
        height: 50,
        width: 250,
        borderWidth: 1,
        borderColor: Colors.dark60,
        borderRadius: 10,
        paddingLeft: 10,
    }
});