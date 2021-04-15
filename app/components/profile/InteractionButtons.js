import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer, ActionSheet } from 'react-native-ui-lib';

import { AuthContext } from '../../context/AuthContext'
import { Feather } from '@expo/vector-icons';

import { followHandler, chatAdd } from '../../api/firebase/FirebaseInteractions'

export default function InteractionButtons({ otherUsername, otherID }) {

    const { userData, setUserData } = useContext(AuthContext)
    console.log(userData)

    const addToChat = () => {
        if (!userData.chats)
            setUserData({ ...userData, chats: [otherUsername] })
        else if (!userData.chats.includes(otherUsername))
            setUserData({ ...userData, chats: [...userData.chats, otherUsername] })

        // update database on my side and other side
        chatAdd(userData.id, otherID, userData.username, otherUsername)
    }

    const onFollow = () => {
        // new following list
        let newFollowing

        if (userData.following && userData.following.includes(otherUsername)) {
            // following currently, need to unfollow
            newFollowing = userData.following.filter(user => user !== otherUsername)
            // unfolllow in db (true parameter)
            followHandler(userData.id, otherUsername, true)
        } else {
            // not following currently
            if (!userData.following) {
                newFollowing = [otherUsername]
            }
            else if (!userData.following.includes(otherUsername)) {
                newFollowing = [...userData.following, otherUsername]
            }
            followHandler(userData.id, otherUsername, false)
        }
        // set state and update db
        setUserData({ ...userData, following: newFollowing })
        
    }


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
