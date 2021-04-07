import React from 'react'
import { View, Image, Text, TextField, TextArea, Button, Colors, Wizard, Card } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';

export default function TextOption({ selectedType, press }) {
    const lightOrange = '#ffede3'

    return (
        <Card
            key={1}
            style={{ marginBottom: 20 }}
            borderRadius={20}
            marginH-19
            onPress={() => press("Text")}
        >

            <View padding-20 borderRadius={20} backgroundColor={selectedType === "Text" ? lightOrange : "#ffffff"}>
                <Text text40 color={Colors.grey10} marginV-8>
                    Text  <FontAwesome name="file-text-o" size={24} color="black" />
            </Text>

                <View row>
                    <Text text70 color={Colors.red20}>writing</Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.red20}>commentary</Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.red20}>other</Text>
                </View>

                <Text text70 color={Colors.grey10} marginT-10>
                    Share your thoughts with the world.
            </Text>

            </View>
        </Card>
    )
}
