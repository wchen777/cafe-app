import React, { useState, useEffect, useRef, useContext } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';

import * as firebase from 'firebase';

import ActionBarHome from '../../components/ActionBarHome';
import MyProfileView from '../../views/MyProfileView';
import HomeView from '../../views/HomeView';
import ChatView from '../../views/ChatView';
import ExploreView from '../../views/ExploreView';

import { AuthContext } from '../../context/AuthContext'

import { gql, useQuery, useLazyQuery } from '@apollo/client'

const GET_USER_INFO = gql`
    query getUserByEmail($email: String!){
        getUserByEmail(email: $email){
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


export default function MainScreen({ navigation }) {

    const [allPosts, setAllPosts] = useState([])

    const { userData, setUserData, authHeader } = useContext(AuthContext)

    const [selectedPage, setSelectedPage] = useState('Home')

    const [selectedCategory, setSelectedCategory] = useState('digital art')

    const [usernames, setUsernames] = useState([])


    let currentUserUID = firebase.auth().currentUser.uid;
    let currentUserEmail = firebase.auth().currentUser.email;

    const emailVars = { email: currentUserEmail }

    // TODO: GET POST DATA ONCOMPLETED, CREATE NEW FUNCTION
    const { error, loadingQuery } = useQuery(GET_USER_INFO, {
        variables: emailVars,
        context: {
            headers: {
                "Content-Type": "application/json",
                "authorization": authHeader
            }
        },
        onCompleted: data => {
            setUserData(data.getUserByEmail)
        },
        onError: err => console.log(err)
    })

    const [queryUserInfo, { loadingLazy, data }] = useLazyQuery(GET_USER_INFO,
        {
            variables: emailVars,
            context: {
                headers: {
                    "Content-Type": "application/json",
                    "authorization": authHeader
                }
            }
        });
    const queryRefresh = () => {
        queryUserInfo()
        setUserData(data.getUserByEmail)
    }

   

    async function getUserInfo() {
        let doc = await firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .get();

        if (!doc.exists) {
            console.log("no user data found")
        } else {
            let dataObj = doc.data();
            setUserData(dataObj)
            getPostData(dataObj.following)
        }
    }

    async function getPostData(following) {
        let doc = await firebase
            .firestore()
            .collection('posts')
            .where("username", "in", userData.following ?? following)
            .get();

        let dataObj = doc.docs.map(doc => doc.data());

        setAllPosts(dataObj)
    }

    // async function getUsernames() {
    //     let doc = await firebase
    //         .firestore()
    //         .collection('users')
    //         .get();

    //     let dataObj = doc.docs.map(doc => doc.data());
    //     setUsernames(dataObj.map(user => user.username));
    // }

    // useEffect(() => {
    //     getUserInfo()
    // }, [])

    // useEffect(() => {
    //     getUsernames();
    // }, [])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#FFFDFC', marginBottom: 0, paddingBottom: 0, padding: 0, margin: 0 }}>

                {selectedPage === "Home" &&
                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        <HomeView
                            navigation={navigation}
                            allPosts={allPosts}
                            setAllPosts={setAllPosts}
                            queryUserInfo={queryRefresh}
                        />
                    </View>
                }

                {selectedPage === "Profile" &&
                    <MyProfileView
                        navigation={navigation}
                    />
                }

                {selectedPage === "Explore" &&
                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        <ExploreView
                            navigation={navigation}
                            allPosts={allPosts}
                            setAllPosts={setAllPosts}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </View>
                }

                {selectedPage === "Chat" &&
                    <ChatView navigation={navigation} usernames={usernames} />
                }

                <ActionBarHome selectedPage={selectedPage} setSelectedPage={setSelectedPage} navigation={navigation} />

            </View>


        </TouchableWithoutFeedback>
    )
}