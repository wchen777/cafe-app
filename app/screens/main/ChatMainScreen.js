import React, { useState, useEffect, useContext, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, TextInput, StyleSheet } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';
import { gql, useSubscription, useQuery, useMutation } from '@apollo/client'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { AuthContext } from '../../context/AuthContext'
import MyMessage from '../../components/chat/MyMessage';
import OtherMessage from '../../components/chat/OtherMessage';

import { v4 as uuidv4 } from 'uuid';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

// gql subscription on new messages
const NEW_MESSAGE = gql`
    subscription newMessage($username: String!){
        newMessage(username: $username){
            uuid from to content createdAt
        }
    }
`
// gql query to get all messages from a certain user
const GET_MESSAGES = gql`
    query getMessages($from: String! $to: String!){
        getMessages(from: $from to: $to){
            uuid from to content createdAt
        }
    }
`

// gql mutation to send a message 
const SEND_MESSAGE = gql`
    mutation sendMessage($to: String! $from: String! $content: String!) {
        sendMessage(to: $to from: $from content: $content) {
            uuid from to content createdAt
        }
    }
`


export default function ChatMain({ route, navigation }) {

    const inputRef = useRef()

    const { usernameOther } = route.params

    // currently typing
    const [typeMessage, setTypeMessage] = useState("")

    useEffect(() => {
        navigation.setOptions({
            headerTitle:
                <Text text60 color={Colors.orange30} >
                    @{usernameOther} </Text>,
            headerRight: ""

        });

    }, [navigation])



    const { userData, setUserData } = useContext(AuthContext)


    // ------------ GQL HOOKS --------------------- //

    const { data: messageDataSub, error: messageError } = useSubscription(NEW_MESSAGE, { variables: { username: userData.username } })

    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onError: err => console.log(err)
    })

    const { error, loading, data } = useQuery(GET_MESSAGES,
        {
            variables: { from: userData.username, to: usernameOther },
            // fetchPolicy: "cache-and-network"
        })

    // -------------------------------------------- //

    console.log(error)

    const [messages, setMessages] = useState([])

    // for when data updates, we first get our messages
    useEffect(() => {
        if (data) {
            console.log(data.getMessages)
            setMessages(data.getMessages)
        }
    }, [])


    useEffect(() => {
        if (messageError) console.log(messageError, "error")

        if (messageDataSub) {
            const message = messageDataSub.newMessage
            console.log(message)

            setMessages([...messages, message])
        }
    }, [messageError, messageDataSub])


    // console.log("messages", messages)

    const msgsList = messages?.slice().sort((m1, m2) => { return m1.createdAt > m2.createdAt ? 1 : -1 }).map((msg) => {
        if (msg.to === userData.username) {
            return <OtherMessage msg={msg} />
        } else {
            return <MyMessage msg={msg} />
        }
    })

    const submitText = () => {
        if (typeMessage === "") return

        let newMsg = {
            content: typeMessage,
            to: usernameOther,
            from: userData.username,
        }

        inputRef.current.clear()
        setTypeMessage("")


        // send the message via mutation
        sendMessage({ variables: newMsg })
    }

    // console.log(messages)

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#FFFDFC', marginBottom: 0, paddingBottom: 0, padding: 0, margin: 0 }}>

                {/* <KeyboardAwareScrollView
                    style={{ marginBottom: 40, flex: 1, flexDirection: 'column' }}
                > */}


                <ScrollView style={{ flex: 1 }}>
                    <View marginH-10 row marginT-20>
                        <TextInput
                            ref={inputRef}
                            placeholder="Send a Message"
                            style={styles.textInput}
                            onSubmitEditing={() => submitText()}
                            onChangeText={(t) => setTypeMessage(t)}
                        />

                        <View marginT-8 marginL-13>
                            <TouchableOpacity onPress={() => submitText()}>
                                <FontAwesome name="send" size={34} color="#FFB36C" />
                            </TouchableOpacity>

                        </View>
                    </View>
                    {msgsList}

                </ScrollView>





                {/* </KeyboardAwareScrollView> */}
            </View>


        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    textInput: {
        height: 52,
        marginBottom: 36,
        minWidth: "80%",
        backgroundColor: "#ffffff",
        borderColor: "#eeeeee",
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 20
    },

});