import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { View, Button, Colors, Text, Card, TextArea, Constants, Drawer, ListItem, Avatar, BorderRadiuses, Image } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import HeaderBarLogo from '../../components/header/HeaderBarLogo'
import HeaderBack from '../../components/header/HeaderBack'

import { AuthContext } from '../../context/AuthContext'

export default function SearchUsers({ navigation, route }) {

    const orange = '#FFB36C'

    const { userData, setUserData } = useContext(AuthContext)


    const { usernames } = route.params

    useEffect(() => {
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })


    const [search, setSearch] = useState(null);
    const [doingSearch, setDoingSearch] = useState(false);


    function displaySearch(searchResult) {
        let searchResults = [];
        if (searchResult === '') {
            setDoingSearch(false);
        } else {
            setDoingSearch(true);
            searchResults = usernames.filter(x => String(x).includes(searchResult.toLowerCase()));
            setSearch(searchResults);
        }
    }

    function renderSearch(row, id) {
        return row !== userData.username && (
            <TouchableOpacity onPress={() => navigation.navigate("OtherProfile", { username: row })}>
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

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, height: 80, alignContent: 'center' }}>
                <SearchBar
                    placeholder="Search for a user"
                    onChangeText={search => displaySearch(search)}
                    value={search}
                    lightTheme='true'
                    containerStyle={{ backgroundColor: 'white', width: '97%', height: 55, marginTop: 10, marginLeft: 10 }}
                    inputContainerStyle={{ backgroundColor: 'white', height: 35 }}
                />
            </View>

            {doingSearch &&

                <View style={{ marginTop: 10 }}>
                    <FlatList
                        data={search}
                        renderItem={({ item, index }) => renderSearch(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            }

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