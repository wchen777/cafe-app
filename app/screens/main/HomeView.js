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
    let imagePosts = null;
    let textPosts = null;
    let audioPosts = null;

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })


    async function getPostData() {
        let doc = await firebase
            .firestore()
            .collection('posts')
            .get();
        //let dataObj = doc.docs.data();
        let dataObj = doc.docs.map(doc => doc.data());
        // setUserData(dataObj)
        setAllPosts(dataObj)

    }

    useEffect(() => {
        getPostData()
    })

    function filterPosts(posts) {
        imagePosts = posts.filter(post => post.type == 'Image');
        audioPosts = posts.filter(post => post.type == 'Audio');
        textPosts = posts.filter(post => post.type == 'Text');
    }

    filterPosts(allPosts);


    return (
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>


                {/* {allPosts.map((post) => <Text> {post.username} {post.title} {post.description} {post.content} {post.type} </Text>)} */}


                {/* refactor navigation props later */}

                {imagePosts.map((post) => <ImageCard  navigation={navigation} imagePost = {post}/>)}
               
                <AudioCard navigation={navigation} />

                {/* <TextCard navigation={navigation} textPosts = {textPosts}  /> */}

                {textPosts.map((post) => <TextCard  navigation={navigation} textPost = {post}/>)}

                {/* whitespace block */}
                <View style={{ height: 40 }} />


            </ScrollView>
        </View>
    )
}
