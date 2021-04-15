import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { View, Button, Colors, Text, Card, TextArea, Constants, Drawer, ListItem, Avatar, BorderRadiuses, Image } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as firebase from "firebase";
import "firebase/firestore";


import { AuthContext } from '../../context/AuthContext'

export default function ChatList({ navigation }) {
    const lightOrange = '#ffdfc2'

    const { userData, setUserData } = useContext(AuthContext)

    const [othersData, setOthersData] = useState()

    const getInitials = () => {
        return userData.first.toUpperCase().charAt(0) + userData.last.toUpperCase().charAt(0)
    }


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
