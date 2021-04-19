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
import { Alert } from "react-native";

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

import { AuthContext } from '../../context/AuthContext'
import InteractionButtons from '../../components/profile/InteractionButtons';


const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};


export default function OtherProfileView({ navigation, route }) {

    const { username } = route.params

    const orange = '#FFB36C'
    const lightOrange = '#ffdfc2'

    const { userData, setUserData } = useContext(AuthContext)
    const [refreshing, setRefreshing] = React.useState(false);


    const [userDataO, setUserDataO] = useState({})
    const [userPosts, setUserPosts] = useState()

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        queryPostsUsername(username);
        wait(1000).then(() => setRefreshing(false));

    }, []);

    async function getUserInfo() {
        let doc = await firebase
            .firestore()
            .collection('users')
            .where('username', "==", route.params["username"])
            .get();

        if (doc.empty) {
            Alert.alert('No user data found!')
        } else {
            let dataObj = doc.docs[0].data();
            setUserDataO(dataObj)
            // userData.current = dataObj
        }
    }


    useEffect(() => {
        navigation.setOptions({
            headerTitle:
                <Text text60 color={Colors.orange30} >
                    @{username} </Text>,
            headerRight: ""

        });

    }, [navigation])

    async function queryPostsUsername(username) {
        try {
             
            let doc = await firebase
                .firestore()
                .collection("posts")
                .where("username", "==", username)
                .get()

            let d = doc.docs.map(doc => doc.data());    
            setUserPosts(d)

        } catch (err) {
            Alert.alert("Error in updating likes.", err.message);
        }
    }

    console.log(userDataO)

    // load all user posts
    useEffect(() => {

        getUserInfo()
        queryPostsUsername(username)

    }, [])


    const getInitials = () => {
        return userDataO.first.toUpperCase().charAt(0) + userDataO.last.toUpperCase().charAt(0)
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


    // TODO: Break this up into components

    return (
        <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>

            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>


                <View style={{ ...styles.centering, marginTop: 20 }}>
                    {userDataO.pic === "" ?
                        <Avatar
                            size={150}
                            label={getInitials()}
                            labelColor={Colors.orange30}
                            backgroundColor={lightOrange} />
                        :
                        <Avatar
                            size={150}
                            source={{ uri: userDataO.pic }} />
                    }
                    <Text text50 color={Colors.grey10} marginT-20>
                        {userDataO.first} {userDataO.last}
                    </Text>
                </View>

                { userData.username !== username && <InteractionButtons otherUsername={username} otherID={userDataO.id}/> }

                <TouchableOpacity onPress={() => navigation.navigate('ViewFollowing', {followings: userDataO?.following, user: userDataO.username})}>
                    <View marginV-10 center>
                        <Text text60 color={Colors.orange30}> Following: {!userData.following ? "" : userDataO?.following?.length - 1} </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.centering}>
                    <Card
                        key={1}
                        style={{ marginBottom: 20, width: 350 }}
                        enableShadow={false}
                        marginT-15
                    >
                        <View bg-white paddingH-10 style={{ flexDirection: 'column', justifyContent: 'space-between', minHeight: 120 }}>

                            <Text text70 color={Colors.grey10} marginV-14>
                                {userDataO.bio === "" || userDataO === undefined ?
                                    'No bio here yet!' : userDataO.bio}
                            </Text>
                        </View>
                    </Card>
                </View>

                <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 6 }}>
                    {userDataO.portfolio !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://${userDataO.portfolio}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }} ><FontAwesome name="suitcase" size={22} color={Colors.orange30} /> : {userDataO.portfolio}</Text>

                        </TouchableOpacity>
                    }
                </View>

                <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-evenly' }}>



                    {userDataO.twitter !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${userDataO.twitter}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 14 }}> <FontAwesome name="twitter" size={24} color="#1DA1F2" />: @{userDataO.twitter}</Text>
                        </TouchableOpacity>
                    }

                    {userDataO.ig !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${userDataO.ig}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 14 }} ><FontAwesome name="instagram" size={24} color="red" /> : @{userDataO.ig}</Text>
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
