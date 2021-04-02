import React, { useEffect } from 'react';
import { ScrollView } from 'react-native'
import { View, Button, } from 'react-native-ui-lib';


import { signOut } from '../../api/firebase/FirebaseAuth'

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

export default function HomeView( {navigation} ) {

    // useEffect(() => {
    //     console.log("asdf")
    //     navigation.setOptions({headerShown: true});
    // }, [navigation])

    return (
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>

                {/* refactor navigation props later */}

                <ImageCard navigation={navigation} />

                <AudioCard navigation={navigation} />

                <ImageCard navigation={navigation} />

                <TextCard navigation={navigation} />

                <ImageCard navigation={navigation} />

                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <Button
                        backgroundColor="#FFB36C"
                        label="Sign Out"
                        labelStyle={{ fontWeight: '600', fontSize: 20 }}
                        style={{ width: 145, marginTop: 30, marginBottom: 40 }}
                        onPress={() => signOut()}
                        enableShadow
                    />
                </View>

                {/* whitespace block */}
                <View style={{ height: 40 }} />


            </ScrollView>
        </View>
    )
}
