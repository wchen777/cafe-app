import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, RefreshControl } from 'react-native'
import { View, Button, Text } from 'react-native-ui-lib';

import ImageCard from '../components/cards/ImageCard';
import AudioCard from '../components/cards/AudioCard';
import TextCard from '../components/cards/TextCard';

import HeaderBarLogo from '../components/header/HeaderBarLogo'
import { AuthContext } from '../context/AuthContext'
import { Foundation } from '@expo/vector-icons';

import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function HomeView({ navigation, allPosts, setAllPosts, queryUserInfo }) {

    const [refreshing, setRefreshing] = React.useState(false);

    const { userData, setUserData } = useContext(AuthContext)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        // THIS IS PASSED IN AS A GQL USELAZYQUERY
        queryUserInfo()
        
        // getPostData()
        wait(1000).then(() => setRefreshing(false));
    }, []);


    async function getUserInfo() {
        let currentUserUID = firebase.auth().currentUser.uid;
        let doc = await firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .get();

        if (!doc.exists) {
            console.log("no data found")
        } else {
            let dataObj = doc.data();
            setUserData(dataObj)
        }
    }


    useEffect(() => {
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: () => <TouchableOpacity onPress={() => {
                onRefresh()
            }} ><Foundation name="refresh" size={30} color="#ffa126" style={{ marginRight: 30 }} /></TouchableOpacity>
        });
    })

    async function getPostData() {
        let doc = await firebase
            .firestore()
            .collection('posts')
            .where("username", "in", userData.following)
            .get();

        let dataObj = doc.docs.map(doc => doc.data());

        setAllPosts(dataObj);
    }

    // useEffect(() => {
    // }, [])

    let count = 1;
    allPosts.sort((p1, p2) => (p1.time < p2.time) ? 1 : -1);
    const postsComponents = allPosts.map((p) => {
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
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0, width: "97%" }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 15, marginHorizontal: 0 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                {postsComponents.length == 0 ?
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }} marginT-10 padding-20>
                        <Text > No posts to see here yet! </Text>
                    </View>
                    : postsComponents}

                {/* whitespace block */}
                <View style={{ height: 40 }} />

            </ScrollView>
        </View>
    )
}
