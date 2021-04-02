import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';

import * as firebase from 'firebase';

import { signOut } from '../../api/firebase/FirebaseAuth'
import ActionBarHome from '../../components/ActionBarHome';

export default function Landing({ navigation }) {


    const testImage = 'https://images.e-flux-systems.com/283237_588943ecc546db7cc5168e868a7848e7.jpg,2000x2000'

    let currentUserUID = firebase.auth().currentUser.uid;
    const [name, setName] = useState('');

    useEffect(() => {
        async function getUserInfo() {
            let doc = await firebase
                .firestore()
                .collection('users')
                .doc(currentUserUID)
                .get();

            if (!doc.exists) {
                Alert.alert('No user data found!')
            } else {
                let dataObj = doc.data();
                setName(dataObj.first + " " + dataObj.last)
            }
        }
        getUserInfo();
    })

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC' }}>
                <View style={{ flexDirection: 'column', marginTop: 15 }}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 90 }}>
                        <Image style={{ width: 120, height: 100 }} source={require('../../img/logo.jpg')} />
                    </View> */}

                    {/* <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 30 }}>
                        Hi {name}!
                    </Text> */}


                    <ScrollView>

                    

                    <Card
                        key={1}
                        style={{ marginBottom: 15 }}
                        onPress={() => console.log('press on a card')}
                        borderRadius={20}
                    >
                        <Card.Image
                            source={testImage}
                            height={250}
                        />

                        <View padding-20 bg-white borderRadius={20}>
                            <Text text40 color={Colors.grey10} marginV-10>
                                Monet: The Garden Paintings
                            </Text>

                            <View row>
                                <Text text60 color={Colors.orange30} >
                                    @claudemonet
                                </Text>
                                <Text text60 color={Colors.grey10}> | </Text>
                                <Text text70 color={Colors.green50}>painting </Text>
                            </View>

                            <Text text70 color={Colors.grey10} marginT-10>
                                description descripton descirption descriprion description
                            </Text>

                            <View>
                                <Text text90 color={Colors.grey50} marginT-10>
                                     100 Likes
                                </Text>

                                <View row right>
                                    {/* <Button
                                        style={{ marginRight: 10 }}
                                        text90
                                        link
                                        iconSource={featureIcon}
                                        label="Feature"
                                    /> */}
                                    {/* <Button text90 link iconSource={shareIcon} label="Share" /> */}
                                </View>
                            </View>
                        </View>


                    </Card>



                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                        <Button
                            backgroundColor="#FFB36C"
                            label="Sign Out"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 30 }}
                            onPress={() => signOut()}
                            enableShadow
                        />
                    </View>
                    </ScrollView>
                </View>

                <ActionBarHome />

            </View>


        </TouchableWithoutFeedback>
    )
}