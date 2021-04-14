import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native'
import { View, Button, Text } from 'react-native-ui-lib';

import { signOut } from '../../api/firebase/FirebaseAuth'

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

import HeaderBarLogo from '../../components/header/HeaderBarLogo'
import { getPosts } from '../../api/firebase/FirebasePosts'

import Moment from 'moment';
import * as firebase from 'firebase';

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function HomeView({ navigation, allPosts, setAllPosts }) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);


    useEffect(() => {
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })

    // TODO: lazy loading and batch fetching and caching
    async function getPostData() {
        let doc = await firebase
            .firestore()
            .collection('posts')
            .get();

        let dataObj = doc.docs.map(doc => doc.data());

        setAllPosts(dataObj)
    }

    useEffect(() => {
        getPostData()
    }, [])

    // function filterPosts(posts) {
    //     imagePosts = posts.filter(post => post.type == 'Image');
    //     audioPosts = posts.filter(post => post.type == 'Audio');
    //     textPosts = posts.filter(post => post.type == 'Text');
    // }

    // filterPosts(allPosts);

    // TODO: need to cache these
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

                {/* refactor navigation props later */}

                {postsComponents}


                {/* {textPosts.map((post) => <TextCard  navigation={navigation} textPost = {post}/>)} */}

                {/* whitespace block */}
                <View style={{ height: 40 }} />

            </ScrollView>
        </View>
    )
}
