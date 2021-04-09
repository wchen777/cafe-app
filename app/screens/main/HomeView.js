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

export default function HomeView({ navigation, allPosts, setAllPosts }) {

    useEffect(() => {
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })


    // function filterPosts(posts) {
    //     imagePosts = posts.filter(post => post.type == 'Image');
    //     audioPosts = posts.filter(post => post.type == 'Audio');
    //     textPosts = posts.filter(post => post.type == 'Text');
    // }

    // filterPosts(allPosts);

    // TODO: need to cache these
    let count = 1
    const postsComponents = allPosts.map((p) => {
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


    return (
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>

                {/* refactor navigation props later */}

                {postsComponents}

                <AudioCard navigation={navigation} />


                {/* {textPosts.map((post) => <TextCard  navigation={navigation} textPost = {post}/>)} */}

                {/* whitespace block */}
                <View style={{ height: 40 }} />


            </ScrollView>
        </View>
    )
}
