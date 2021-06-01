import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, DevSettings, RefreshControl } from 'react-native'
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer, ActionSheet } from 'react-native-ui-lib';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as firebase from "firebase";
import "firebase/firestore";

import ImageCard from '../components/cards/ImageCard';
import AudioCard from '../components/cards/AudioCard';
import TextCard from '../components/cards/TextCard';


import { AuthContext } from '../context/AuthContext'

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};



export default function MyProfileView({ navigation }) {
    const orange = '#FFB36C'
    const lightOrange = '#ffdfc2'
    const [userPosts, setUserPosts] = useState()
    const [refreshing, setRefreshing] = React.useState(false);

    const { userData, setUserData } = useContext(AuthContext)

    console.log("home user data", userData)
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        // queryPostsUsername(userData.username);
        wait(1000).then(() => setRefreshing(false));

    }, []);

    // async function queryPostsUsername(username) {
    //     try {
    //         let doc = await firebase
    //             .firestore()
    //             .collection("posts")
    //             .where("username", "==", username)
    //             .get()

    //         let d = doc.docs.map(doc => doc.data());
    //         setUserPosts(d)

    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }


    useEffect(() => {
        navigation.setOptions({
            headerTitle:
                <Text text60 color={Colors.orange30} >
                    @{userData.username} </Text>,
            headerRight: () =>
                <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} >
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 25 }}>
                        <FontAwesome name="cog" size={24} color="#4d4d4d" />
                    </View>
                </TouchableOpacity>

        });
    }, [navigation])

    // useEffect(() => {
    //     queryPostsUsername(userData.username)
    // }, [])


    const getInitials = () => {
        return userData.first.toUpperCase().charAt(0) + userData.last.toUpperCase().charAt(0)
    }

    let count = 1;
    userPosts?.sort((p1, p2) => (p1.time < p2.time) ? 1 : -1);
    const postsComponents = userPosts?.map((p) => {
        switch (p.type) {
            case 'Text':
                return (<TextCard navigation={navigation} textPost={p} key={count++} />)
            case 'Image':
                return (<ImageCard navigation={navigation} imagePost={p} key={count++} />)
            case 'Audio':
                return (<AudioCard navigation={navigation} audioPost={p} key={count++} />)
            default:
                return
        }
    })



    return (
        <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>

            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                <View style={{ ...styles.centering, marginTop: 20 }}>
                    {userData.pic === "" ?
                        <Avatar
                            size={150}
                            label={getInitials()}
                            labelColor={Colors.orange30}
                            backgroundColor={lightOrange}
                        />
                        :
                        <Avatar
                            size={150}
                            source={{ uri: userData.pic }} />
                    }


                    <Text text50 color={Colors.grey10} marginT-20>
                        {userData.first} {userData.last}
                    </Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ViewFollowing', {followings: userData.following, user: userData.username})}>
                    <View marginV-28 center>
                        <Text text60 color={Colors.orange30}> Following: {!userData.following ? "" : userData.following.length - 1} </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.centering}>
                    <Card
                        key={1}
                        style={{ marginBottom: 20, width: 350 }}
                        enableShadow={false}
                        marginT-15
                        onPress={() => navigation.navigate("EditBio")}
                    >
                        <View bg-white paddingH-10 style={{ flexDirection: 'column', justifyContent: 'space-between', minHeight: 120 }}>

                            <Text text70 color={Colors.grey10} marginV-14>
                                {userData.bio === "" || userData === undefined ?
                                    'No bio here yet!' : userData.bio}
                            </Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} marginB-15>
                                <Feather name="edit" size={20} color="grey" />
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

                <View marginT-45 marginH-8>
                    {postsComponents}
                </View>



                <View style={{ marginTop: 40 }} />

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
