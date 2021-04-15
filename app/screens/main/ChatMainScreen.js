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

// gql subscription on new messages
const NEW_MESSAGE = gql`
    subscription newMessage{
        newMessage{
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

    const { error, loading, data } = useQuery(GET_MESSAGES, { variables: { from: userData.username, to: usernameOther } })

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (data) {
            setMessages(data.getMessages)
        }

    }, [data])

    // console.log("data", data)

    console.log("messages", messages)

    const msgsList = messages?.slice().sort((m1, m2) => { return m1.createdAt > m2.createdAt ? 1 : -1 }).map((msg) => {
        if (msg.to === userData.username) {
            return <OtherMessage msg={msg} />
        } else {
            return <MyMessage msg={msg} />
        }
    })

    const submitText = () => {

        let newMsg = {
            content: typeMessage,
            to: usernameOther,
            from: userData.username,
            uuid: uuidv4(),
            createdAt: new Date().toISOString()
        }
        inputRef.current.clear()
        setTypeMessage("")
        setMessages([...messages, newMsg])
    }

    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#FFFDFC', marginBottom: 0, paddingBottom: 0, padding: 0, margin: 0 }}>

                <KeyboardAwareScrollView
                    behavior="padding"
                    style={{ marginBottom: 20 }}
                >
                    <View>


                        <View style={{ flexDirection: 'column' }} marginT-10>
                            {msgsList}
                        </View>
                        {/* <Text marginV-40>
                                asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasd
                            </Text> */}





                        <View marginH-10 row marginT-20>
                            <TextInput 
                                ref={inputRef}
                                placeholder="Send a Message" 
                                style={styles.textInput} 
                                onSubmitEditing={() => submitText()}
                                onChangeText={(t) => setTypeMessage(t)}
                                />
                                
                            <View marginT-10 marginL-13>
                                <FontAwesome name="send" size={34} color="#FFB36C" />
                            </View>
                        </View>


                    </View>

                </KeyboardAwareScrollView>
            </View>


        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({

    textInput: {
        height: 60,
        marginBottom: 36,
        minWidth: "80%",
        backgroundColor: "#ffffff",
        borderColor: "#eeeeee",
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 20
    },

});