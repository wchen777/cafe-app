import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { View, Button, Avatar, Colors, Text, Card } from 'react-native-ui-lib';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';




import { signOut } from '../../api/firebase/FirebaseAuth'


export default function MyProfileView({ navigation, userData }) {
    const orange = '#FFB36C'
    const lightOrange = '#ffdfc2'

    useEffect(() => {
        console.log("asdff")
        console.log(userData.username)
        navigation.setOptions({
            headerTitle: <Text text60 color={Colors.orange30} >
                @{userData.username} </Text>
        });

    }, [navigation])

    console.log(userData)


    // TODO: Break this up into components

    return (
        <View style={{ flexDirection: 'column', margin: 0, padding: 0 }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>



                <View style={{ ...styles.centering, marginTop: 20 }}>
                    <Avatar size={150} label='TT' labelColor={Colors.orange30} backgroundColor={lightOrange} />

                    <Text text50 color={Colors.grey10} marginT-20>
                        {userData.first} {userData.last}
                    </Text>
                </View>

                <Card
                    key={1}
                    style={{ marginBottom: 20, width: 350 }}
                    onPress={() => console.log("edit bio")}
                    enableShadow={false}
                    marginT-12
                >
                    <View bg-white paddingH-10 style={{ flexDirection: 'column', justifyContent: 'space-between', minHeight: 120 }}>

                        <Text text70 color={Colors.grey10} marginV-14>
                            No bio here yet! No bio here yet! No bio here yet! No bio here yet! No bio here yet! Need to move those two buttons elsewhere
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }} marginB-15>
                            <Feather name="edit" size={20} color="grey" />
                        </View>
                    </View>
                </Card>


                <TouchableOpacity onPress={() => Linking.openURL(`https://${userData.portfolio}`)}>
                    {userData.portfolio !== "" &&
                        <View style={{ paddingVertical: 9, flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }} marginR-5>
                                <Entypo name="suitcase" size={17} color={Colors.orange30} />: {userData.portfolio}
                            </Text>
                        </View>
                    }
                </TouchableOpacity>

                <View style={{ paddingVertical: 6, flexDirection: 'row', justifyContent: 'center' }}>
                    {userData.twitter !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://twitter.com/${userData.twitter}`)}>
                            <Text style={{ fontWeight: 'bold' }} marginR-8> <FontAwesome name="twitter" size={24} color="#1DA1F2" />: @{userData.twitter}</Text>
                        </TouchableOpacity>
                    }

                    {userData.ig !== "" &&
                        <TouchableOpacity onPress={() => Linking.openURL(`https://instagram.com/${userData.ig}`)}>
                            <Text style={{ fontWeight: 'bold' }} marginL-8><FontAwesome name="instagram" size={24} color="red" /> : @{userData.ig}</Text>
                        </TouchableOpacity>}
                </View>



                <View style={styles.centering}>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Edit Profile"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30, marginBottom: 40, marginRight: 6 }}
                            // onPress={() => signOut()}
                            enableShadow
                        />
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign Out"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30, marginBottom: 40, marginLeft: 6 }}
                            onPress={() => signOut()}
                            enableShadow
                        />
                    </View>

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
    }
});