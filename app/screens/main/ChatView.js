import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { View, Button, Colors, Text, Card, TextArea, Constants, Drawer, ListItem, Avatar, BorderRadiuses, Image } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import HeaderBarLogo from '../../components/header/HeaderBarLogo'
import HeaderBack from '../../components/header/HeaderBack'


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

    const orders = [
        {
            name: 'Amy Farha',
            time: '3 hrs',
            content: 'Hi! How are you?',
            mediaUrl: 'https://gravatar.com/avatar/8668e1d18523ffc4b78a2d3c45420153?s=200&d=robohash&r=x'
        },
        {
            name: 'Chris Jackson',
            time: 'Yesterday',
            content: 'What is up?',
            mediaUrl: 'https://gravatar.com/avatar/8668e1d18523ffc4b78a2d3c45420153?s=200&d=robohash&r=x'
        }
    ]


    function renderRow(row, id) {

        return (
            <View key={id} id={id}>
                <ListItem
                    activeBackgroundColor={Colors.dark60}
                    activeOpacity={0.3}
                    height={77.5}
                    key={id}
                >
                    <ListItem.Part left marginH-10>
                        <Avatar
                            source={{ uri: row.mediaUrl }}
                            style={styles.image}
                            animate
                        />
                    </ListItem.Part>
                    <ListItem.Part middle column containerStyle={[styles.border, { paddingRight: 17 }]}>
                        <ListItem.Part containerStyle={{ marginBottom: 3 }}>
                            <Text dark10 text70 style={{ flex: 1, marginRight: 10, fontWeight: 'bold' }} numberOfLines={1}>{row.name}</Text>
                            <Text dark10 text70 style={{ marginTop: 2, fontSize: 12 }}>{row.time}</Text>
                        </ListItem.Part>
                        <ListItem.Part>
                            <Text style={{ flex: 1, marginRight: 10 }} text90 dark40 numberOfLines={1}>{row.content}</Text>
                        </ListItem.Part>
                    </ListItem.Part>
                </ListItem>
            </View>
        );
    }


    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} marginT-24>
                <Text style={{ fontWeight: 'bold', fontSize: 30, marginLeft: 30 }}>My Chats </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SearchUsers", {usernames: usernames})}>
                    <FontAwesome name="search" size={24} color="#4d4d4d" style={{ marginTop: 8, marginLeft: 110 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesome name="ellipsis-h" size={24} color="#4d4d4d" style={{ marginTop: 8, marginRight: 30 }} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 120 }} marginT-30>
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


            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={orders}
                    renderItem={({ item, index }) => renderRow(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>


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