import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer, ActionSheet } from 'react-native-ui-lib';

import { AuthContext } from '../../context/AuthContext'
import { Feather } from '@expo/vector-icons';

export default function InteractionButtons({ otherUsername }) {

    const { userData, setUserData } = useContext(AuthContext)

    const addToChat = () => {
        if (!userData.chats)
            setUserData({ ...userData, chats: [otherUsername] })
        else if (!userData.chats.includes(otherUsername))
            setUserData({ ...userData, chats: [...userData.chats, otherUsername] })

        // update database on my side and other side
    }

    const onFollow = () => {

        if (userData.following && userData.following.includes(otherUsername)) {
            setUserData({ ...userData, following: userData.following.filter(user => user !== otherUsername) })
            // update database on my end for unfollow

        } else {
            // not following currently
            if (!userData.following) {
                setUserData({ ...userData, following: [otherUsername] })
            }
            else if (!userData.following.includes(otherUsername)) {
                setUserData({ ...userData, following: [...userData.following, otherUsername] })
            }

            // update database for follow
        }

    }


    console.log(userData)

    const renderFollowLabel = () => {
        if (!userData.following || !userData.following.includes(otherUsername))
            return (
                <>
                    <Feather name="plus" size={25} color="white" />
                    <View marginT-2>
                        <Text white style={{ fontSize: 15 }}>  Follow</Text>
                    </View>

                </>
            )
        return (
            <>
                <Feather name="check" size={25} color="white" />
                <View marginT-2>
                    <Text white style={{ fontSize: 15 }}>  Following!</Text>
                </View>

            </>
        )
    }

    const renderChatLabel = () => {
        if (!userData.chats || !userData.chats.includes(otherUsername))
            return (
                <>
                    <Feather name="plus" size={25} color="white" />
                    <View marginT-2>
                        <Text white style={{ fontSize: 15 }}>  Add to Chat</Text>
                    </View>

                </>
            )
        else
            return (
                <>
                    <Feather name="check" size={25} color="white" />
                    <View marginT-2>
                        <Text white style={{ fontSize: 15 }}>  Added!</Text>
                    </View>

                </>
            )
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} marginV-25>
            <Button
                backgroundColor="#FFB36C"
                label={renderFollowLabel()}
                marginR-8
                labelStyle={{ fontWeight: '600', fontSize: 15 }}
                style={{ width: 155 }}
                onPress={() => onFollow()}
                enableShadow
            />


            <Button
                backgroundColor="#FFB36C"
                label={renderChatLabel()}
                marginL-8
                labelStyle={{ fontWeight: '600', fontSize: 15 }}
                style={{ width: 155 }}
                onPress={() => addToChat()}
                enableShadow
            />
        </View>
    )
}
