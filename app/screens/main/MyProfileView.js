import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer, ActionSheet } from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { signOut } from '../../api/firebase/FirebaseAuth'
import * as firebase from "firebase";
import "firebase/firestore";

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

import {updatePic} from '../../api/firebase/FirebaseAuth';


export default function MyProfileView({ navigation, userData, userPosts }) {
    console.log(userData);
    const orange = '#FFB36C'
    const lightOrange = '#ffdfc2'
    const [showSheet, setShowSheet] = useState(false);




    useEffect(() => {
        navigation.setOptions({
            headerTitle:
                <Text text60 color={Colors.orange30} >
                    @{userData.username} </Text>,
            headerRight: () =>
                <TouchableOpacity onPress={() => navigation.navigate("EditProfile", userData)} >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 25 }}>
                        <FontAwesome name="cog" size={24} color="#4d4d4d" />
                    </View>
                </TouchableOpacity>

        });


    }, [navigation])

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

    const onPlaceholderPress = () => {
        if (showSheet) {
            setShowSheet(!showSheet)
        }
        setShowSheet(!showSheet)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result.uri);
            updatePic(result.uri);
        }

        setShowSheet(false)
    };


    const getInitials = () => {
        return userData.first.toUpperCase().charAt(0) + userData.last.toUpperCase().charAt(0)
    }

    let count = 1;
    userPosts.sort((p1, p2) => (p1.time < p2.time) ? 1: -1);
    const postsComponents = userPosts.map((p) => {
        switch (p.type) {
            case 'Text':
                return (<TextCard  navigation={navigation} textPost = {p} key={count++}/>)
            case 'Image':
                return (<ImageCard  navigation={navigation} imagePost = {p} key={count++}/>)
            case 'Audio':
                return (<AudioCard  navigation={navigation} audioPost = {p} key={count++}/>)
            default:
                return
        }
    })



    // TODO: Break this up into components

    return (
        <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>

            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>

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
                    // onDismiss={() => setTimeout(() => { if (!imgActive) {
                    //     console.log(imgActive)
                    //     setShowSheet(false)
                    // }}, 1000)}
                    containerStyle={{ paddingBottom: 25 }}
                />

                <View style={{ ...styles.centering, marginTop: 20 }}>
                    <Avatar size={150} label={getInitials()} labelColor={Colors.orange30} backgroundColor={lightOrange} onPress={() => onPlaceholderPress()} source={{uri: userData.pic}} />

                    <Text text50 color={Colors.grey10} marginT-20>
                        {userData.first} {userData.last}
                    </Text>
                </View>

                <View style={styles.centering}>
                    <Card
                        key={1}
                        style={{ marginBottom: 20, width: 350 }}
                        enableShadow={false}
                        marginT-15
                        onPress={() => navigation.navigate("EditBio", userData)}
                    >
                        <View bg-white paddingH-10 style={{ flexDirection: 'column', justifyContent: 'space-between', minHeight: 120 }}>

                            <Text text70 color={Colors.grey10} marginV-14>
                                {userData.bio === "" || userData === undefined ?
                                    'No bio here yet! Also edit profile does not register immediately, need to fix profile gallery view' : userData.bio}
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} marginB-15>
                                <Feather name="edit" size={20} color="grey" onPress={() => navigation.navigate("EditBio", userData)} />
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 6 }}>
                    {userData.portfolio !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://${userData.portfolio}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }} ><FontAwesome name="suitcase" size={22} color={Colors.orange30} /> : {userData.portfolio}</Text>

                        </TouchableOpacity>
                    }
                </View>

                <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-evenly' }}>



                    {userData.twitter !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${userData.twitter}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 14 }}> <FontAwesome name="twitter" size={24} color="#1DA1F2" />: @{userData.twitter}</Text>
                        </TouchableOpacity>
                    }

                    {userData.ig !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${userData.ig}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 14 }} ><FontAwesome name="instagram" size={24} color="red" /> : @{userData.ig}</Text>
                        </TouchableOpacity>}

                </View>

                <View style={{marginTop: 40}}>

                {postsComponents}
                </View>




            </ScrollView>
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
