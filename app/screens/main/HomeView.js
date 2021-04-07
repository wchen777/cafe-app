import React, { useEffect } from 'react';
import { ScrollView } from 'react-native'
import { View, Button, } from 'react-native-ui-lib';


import { signOut } from '../../api/firebase/FirebaseAuth'

import ImageCard from '../../components/cards/ImageCard';
import AudioCard from '../../components/cards/AudioCard';
import TextCard from '../../components/cards/TextCard';

import HeaderBarLogo from '../../components/header/HeaderBarLogo'

export default function HomeView({ navigation }) {
    useEffect(() => {
        console.log("asdf")
        navigation.setOptions({
            headerShown: true, headerTitle: <HeaderBarLogo />, headerBackTitleVisible: false,
            headerBackImage: () => <HeaderBack />,
            headerRight: ""
        });
    })




    return (
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 15 }}>

                {/* refactor navigation props later */}

                <ImageCard navigation={navigation} />

                <AudioCard navigation={navigation} />

                <ImageCard navigation={navigation} />

                <TextCard navigation={navigation} />

                <ImageCard navigation={navigation} />

                {/* whitespace block */}
                <View style={{ height: 40 }} />


            </ScrollView>
        </View>
    )
}
