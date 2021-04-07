import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Button, Avatar, Colors, Text, Card, TextArea, Constants, Drawer } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { signOut } from '../../api/firebase/FirebaseAuth'


export default function MyProfileView({ navigation, userData }) {
    const orange = '#FFB36C'
    const lightOrange = '#ffdfc2'



    useEffect(() => {
        navigation.setOptions({
            headerTitle:
                <Text text60 color={Colors.orange30} >
                    @{userData.username} </Text>,
            headerRight: () => 
            <TouchableOpacity onPress={() => navigation.navigate("EditProfile", userData )} >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 25 }}>
                    <FontAwesome name="cog" size={24} color="#4d4d4d"/>
                </View>
            </TouchableOpacity>

        });

    }, [navigation])


    const getInitials = () => {
        return userData.first.toUpperCase().charAt(0) + userData.last.toUpperCase().charAt(0)
    }



    // TODO: Break this up into components

    return (
        <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>

            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>

                <View style={{ ...styles.centering, marginTop: 20 }}>
                    <Avatar size={150} label={getInitials()} labelColor={Colors.orange30} backgroundColor={lightOrange} />

                    <Text text50 color={Colors.grey10} marginT-20>
                        {userData.first} {userData.last}
                    </Text>
                </View>

                <Card
                    key={1}
                    style={{ marginBottom: 20, width: 350 }}
                    enableShadow={false}
                    marginT-15
                    onPress={() => navigation.navigate("EditProfile", userData )}
                >
                    <View bg-white paddingH-10 style={{ flexDirection: 'column', justifyContent: 'space-between', minHeight: 120 }}>

                        <Text text70 color={Colors.grey10} marginV-14>
                            {userData.bio}
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} marginB-15>
                            <Feather name="edit" size={20} color="grey" onPress={() => navigation.navigate("EditProfile", { userData: userData })} />
                        </View>
                    </View>
                </Card>

                {/* NEED TO FIX OVERFLOW HERE */}
                <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 6 }}>
                {userData.portfolio !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://${userData.portfolio}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14 }} ><FontAwesome name="suitcase" size={22} color={Colors.orange30} /> : {userData.portfolio}</Text>

                        </TouchableOpacity>
                    }
                </View>

                <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-evenly' }}>



                    {userData.twitter !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${userData.twitter}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 14 }}> <FontAwesome name="twitter" size={24} color="#1DA1F2" />: @{userData.twitter}</Text>
                        </TouchableOpacity>
                    }

                    {userData.ig !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${userData.ig}`)}>
                            <Text style={{ fontWeight: 'bold', fontSize: 14, marginLeft: 14 }} ><FontAwesome name="instagram" size={24} color="red" /> : @{userData.ig}</Text>
                        </TouchableOpacity>}

                </View>


                {/* whitespace block */}
                <View style={{ height: 40 }} />


            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    centering: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
});
