import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { View, Button, Colors, Text, Card, TextArea, Constants, Drawer, ListItem, Avatar, BorderRadiuses, Image } from 'react-native-ui-lib';

export default function ViewFollowing({ route, navigation }) {

    const { followings, user } = route.params

    function renderUser(row, id) {
        console.log(row)
        return row !== user && (
            <TouchableOpacity onPress={() => navigation.push("OtherProfile", { username: row })}>
                <View key={id} id={id}>
                    <ListItem
                        activeBackgroundColor={Colors.dark60}
                        activeOpacity={0.3}
                        height={77.5}
                        key={id}
                    >
                        <ListItem.Part left marginR-10 marginL-30>

                            <Text text60 color={Colors.orange30} >
                                @{row}
                            </Text>

                        </ListItem.Part>
                    </ListItem>
                </View>
            </TouchableOpacity> 
         
        )
    }

    return (
        <View>

            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={followings}
                    renderItem={({ item, index }) => renderUser(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        </View>
    )
}
