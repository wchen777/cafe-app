import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { SearchBar } from 'react-native-elements';
import { View, Button, Colors, Text, Card, TextArea, Constants, Drawer, ListItem, Avatar, BorderRadiuses, Image } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function ChatView({ navigation }) {
    const [search, setSearch] = useState(null);
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
          <View>
            <ListItem
              activeBackgroundColor={Colors.dark60}
              activeOpacity={0.3}
              height={77.5}
              onLongPress={() => { Alert.alert('Delete message?') }}
            >
              <ListItem.Part left>
                <Image
                  source={{uri: row.mediaUrl}}
                  style={styles.image}
                />
              </ListItem.Part>
              <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
                <ListItem.Part containerStyle={{marginBottom: 3}}>
                  <Text dark10 text70 style={{flex: 1, marginRight: 10, fontWeight: 'bold'}} numberOfLines={1}>{row.name}</Text>
                  <Text dark10 text70 style={{marginTop: 2, fontSize: 12}}>{row.time}</Text>
                </ListItem.Part>
                <ListItem.Part>
                  <Text style={{flex: 1, marginRight: 10}} text90 dark40 numberOfLines={1}>{row.content}</Text>
                </ListItem.Part>
              </ListItem.Part>
            </ListItem>
          </View>
        );
      }


    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <Text style={{fontWeight: 'bold', fontSize: 30, marginLeft: 20}}>Chat </Text>
                <FontAwesome name="edit" size={24} color="#4d4d4d" style={{marginTop: 8, marginLeft: 210}}/>
                <FontAwesome name="ellipsis-h" size={24} color="#4d4d4d" style={{marginTop: 8, marginRight: 20}}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                <SearchBar
                    placeholder="Search"
                    onChangeText={search => setSearch(search)}
                    value={search}
                    lightTheme = 'true'
                    containerStyle = {{backgroundColor: '#FFB36C', width: '90%', height: 55}}
                    inputContainerStyle = {{backgroundColor: 'white', height: 35}}
                />
            </View>

            <View style={{marginTop: 10}}>
                  <FlatList
                        data={orders}
                        renderItem={({item, index}) => renderRow(item, index)}
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
      marginHorizontal: 14
    },
    border: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.dark70
    }
});