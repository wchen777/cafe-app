import React from 'react'
import { View, Image, Text, TextField, TextArea, Button, Colors, Wizard, Card } from 'react-native-ui-lib';
import { Fontisto } from '@expo/vector-icons';

export default function AudioOption({ selectedType, press }) {
    const lightOrange = '#ffede3'

    return (
        <Card
            key={1}
            style={{ marginBottom: 20 }}
            borderRadius={20}
            marginH-19
            onPress={() => press("Audio")}
        >

            <View padding-20 borderRadius={20} backgroundColor={selectedType === 'Audio' ? lightOrange : "#ffffff"}>
                <Text text40 color={Colors.grey10} marginV-8>
                    Audio  <Fontisto name="headphone" size={24} color="black" />
                </Text>
                

                <View row>
                    <Text text70 color={Colors.blue50}>music</Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.blue50}>podcast</Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.blue50}>other</Text>
                </View>
                

                <Text text70 color={Colors.grey10} marginT-10>
                    Let's hear what's on your mind.
            </Text>

            </View>
        </Card>
    )
}
