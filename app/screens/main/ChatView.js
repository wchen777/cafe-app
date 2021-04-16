import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { View, Button, Colors, Text, Card, TextArea, Constants, Drawer, ListItem, Avatar, BorderRadiuses, Image } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import HeaderBarLogo from '../../components/header/HeaderBarLogo'
import HeaderBack from '../../components/header/HeaderBack'
import ChatList from '../../components/chat/ChatList';


export default function ChatView({ navigation, usernames }) {

    const orange = '#FFB36C'

    useEffect(() => {
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })

    const renderPatioButton = () => {
        return (
            <>
                <Feather name="plus" size={30} color="white" marginLeft={10} />
                <View marginB-2>
                    <Text white style={{ fontSize: 16 }}> Start Patio</Text>
                </View>

            </>
        )
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} marginT-24>
                <Text style={{ fontWeight: 'bold', fontSize: 30, marginLeft: 30 }}>My Chats </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SearchUsers", {usernames: usernames})}>
                    <FontAwesome name="search" size={24} color="#4d4d4d" style={{ marginTop: 8, marginLeft: 110, marginRight: 40 }} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 120 }} marginV-30>
                <Button
                    label={renderPatioButton()}
                    backgroundColor={orange}
                    avoidInnerPadding
                    style={{ height: 60, paddingTop: 5 }}
                    borderRadius={25}
                    onPress={() => navigation.navigate("CreatePatio")}
                    size="large"
                />
            </View>

            <ChatList navigation={navigation}/>
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
        borderColor: Colors.dark70
    }
});