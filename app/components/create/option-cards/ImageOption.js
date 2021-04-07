import React from 'react'
import { View, Image, Text, TextField, TextArea, Button, Colors, Wizard, Card } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';

export default function ImageOption({ selectedType, press }) {
    const lightOrange = '#ffede3'

    return (
        <Card
            key={1}
            style={{ marginBottom: 20 }}
            borderRadius={20}
            marginH-19
            bg={lightOrange}
            onPress={() => press("Image")}
        >

            <View padding-20 borderRadius={20} backgroundColor={selectedType === "Image" ? lightOrange : "#ffffff"}>
                <Text text40 color={Colors.grey10} marginB-8>
                    Image  <Ionicons name="md-image" size={24} color="black" />
                </Text>

                <View row>
                    <Text text70 color={Colors.green20}>painting</Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.green20}>digital art</Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.green20}>design</Text>
                    <Text text60 color={Colors.grey10}> | </Text>

                </View>
                <View row marginT-5>
                    <Text text70 color={Colors.green20}>photography</Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.green20}>other</Text>
                </View>

                <Text text70 color={Colors.grey10} marginT-10>
                    Show us your wildest and most ambitious captures and creations.
                </Text>

            </View>
        </Card>
    )
}
