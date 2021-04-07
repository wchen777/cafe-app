import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native'
import { View, Button, Text } from 'react-native-ui-lib';


import { signOut } from '../../api/firebase/FirebaseAuth'

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

import HeaderBarLogo from '../../components/header/HeaderBarLogo'

import { getPosts } from '../../api/firebase/FirebasePosts'

import * as firebase from 'firebase';

export default function HomeView({ navigation }) {

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        console.log("asdf")
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })


    // async function getPostData() {
    //     let doc = await firebase
    //         .firestore()
    //         .collection('posts')
    //         .get();
    //     let dataObj = doc.docs.data();
    //     console.log(doc.docs)
    //     // setUserData(dataObj)
    //     setAllPosts(dataObj)

    // }

    // useEffect(() => {

    //     getPostData()
    // })

    // console.log(allPosts)


    return (
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>


                {allPosts.map((post) => <Text> {post.username} {post.title} {post.description} {post.content} {post.type} </Text>)}


                {/* refactor navigation props later */}

                <ImageCard navigation={navigation} />

                <AudioCard navigation={navigation} />

                <TextCard navigation={navigation} />

                {/* whitespace block */}
                <View style={{ height: 40 }} />


            </ScrollView>
        </View>
    )
}
