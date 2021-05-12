import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';
import { gql, useSubscription, useQuery, useMutation } from '@apollo/client'

const GET_MESSAGES = gql`
    query getMessages{
        testQuery{
            uuid
            content
            from
            to
            createdAt
        }
    }
`

export default function CreatePatio({ navigation }) {



    const { loading, data, error } = useQuery(GET_MESSAGES, {
        context: {
            headers: {
                "Content-Type": "application/json",
                "authorization": "123easdfw"
            }
        }
    })
    console.log(loading, data, error);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#FFFDFC', marginBottom: 0, paddingBottom: 0, padding: 0, margin: 0  }}>
                <View style={{flexDirection:'row', justifyContent: 'center', marginTop: 20}}>
                    <Text>
                        Patio coming soon!
                    </Text>
                    {/* <Button><Text>Something</Text></Button> */}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}