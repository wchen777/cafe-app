import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { View, Button, Colors, Text, Card, TextArea, Constants, Drawer, ListItem, Avatar, BorderRadiuses, Image } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";

import { gql, useSubscription, useLazyQuery, useMutation } from '@apollo/client'

import { AuthContext } from '../../context/AuthContext'


// // gql subscription on new messages
// const NEW_MESSAGE = gql`
//     subscription newMessage{
//         newMessage{
//             uuid from to content createdAt
//         }
//     }
// `
// // gql query to get all messages from a certain user
// const GET_MESSAGES = gql`
//     query getMessages($from: [String]! $to: String!){
//         getMessages(from: $from to: $to){
//             uuid from to content createdAt
//         }
//     }
// `


export default function ChatList({ navigation }) {

    const { userData, setUserData } = useContext(AuthContext)

    const [othersData, setOthersData] = useState()


    // --------------GQL stuff -------------

    // const [messages, setMessages] = useState({})

    // const { data: messageData, error: messageError } = useSubscription(NEW_MESSAGE)
    // // get existing messages from user, call query
    // const [getMessages, { loading: messagesLoading, data: messagesData }] = useLazyQuery(GET_MESSAGES)

    // // if we got messages
    // useEffect(() => {
    //     if (messagesData) {
    //         console.log("here")
    //         let sortedMessagesByUser = {}
    //         // sort all messages into which user's conversation it is
    //         for (let msg of messagesData) {
    //             const otherU = msg.to === userData.username ? msg.from : msg.to
    //             let currMsgs = sortedMessagesByUser[otherU] ?? []
    //             sortedMessagesByUser = {...sortedMessagesByUser, [otherU]: [...currMsgs, msg]}
    //         }

    //         setMessages(sortedMessagesByUser)
    //     }
    // }, [])


    // useEffect(() => {
    //     if (messageError) console.log(messageError)

    //     if (messageData) {
    //         const message = messageData.newMessage
    //         // otherUser is either the to or from of the message
    //         const otherUser = userData.username === message.to ? message.from : message.to


    //         // dispatch({ type: 'ADD_MESSAGE', payload: {
    //         //     username: otherUser,
    //         //     message: message
    //         // }})
    //     }
    // }, [messageError, messageData])

    // console.log(messages)

    // ---------------------------------- //


    async function getUsersInfo() {
        let doc = await firebase
            .firestore()
            .collection('users')
            .where('username', "in", userData.chats)
            .get();

        let dataObj = doc.docs.map(d => d.data());
        setOthersData(dataObj)


        // let uNames = dataObj.map(d => d.username)
        // // get messages from the list of usernames retrived from the database call
        // getMessages({ variables: { to: userData.username, from: uNames}})
    }

    // get all user data for all other users that are in the user's chat list
    useEffect(() => {
        getUsersInfo()
    }, [])



    function renderRow(u, id) {

        return (
            <TouchableOpacity key={id} id={id} onPress={() => navigation.navigate("ChatMain", {usernameOther: u.username})}>
                <ListItem
                    activeBackgroundColor={Colors.dark60}
                    activeOpacity={0.3}
                    height={77.5}
                    key={id}
                >
                    <ListItem.Part left marginH-10>
                        {u.pic === "" ?
                            <Avatar
                                style={styles.image}
                                label={getInitials()}
                                labelColor={Colors.orange30}
                                animate
                                backgroundColor={lightOrange} />
                            :
                            <Avatar
                                style={styles.image}
                                animate
                                source={{ uri: u.pic }} />
                        }
                    </ListItem.Part>
                    <ListItem.Part middle column containerStyle={[styles.border, { paddingRight: 17 }]}>
                        <ListItem.Part containerStyle={{ marginBottom: 3 }}>
                            <Text dark10 text70 style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }} numberOfLines={1}>
                                {u.first} {u.last}
                            </Text>
                            <Text dark10 text70 style={{ marginTop: 2, fontSize: 12 }}>placeholder-time</Text>
                        </ListItem.Part>
                        <ListItem.Part>
                            <Text style={{ flex: 1, marginRight: 10 }} text90 dark40 numberOfLines={1}>Placeholder, latest message not implemented</Text>
                        </ListItem.Part>
                    </ListItem.Part>
                </ListItem>
            </TouchableOpacity>
        );
    }


    return (
        <View style={{ marginTop: 10 }}>
            <FlatList
                data={othersData}
                renderItem={({ item, index }) => renderRow(item, index)}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 54,
        height: 54,
        borderRadius: BorderRadiuses.br20,
        marginHorizontal: 20
    },
    border: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.dark70
    }
});
