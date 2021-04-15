import React, { useState, useEffect, useContext } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';

export default function MyMessage({ msg }) {
    const orange = '#FFB36C'

    return (
        <View row style={{width: "100%", justifyContent: 'flex-end'}} marginR-60 paddingR-20 key={msg.uuid} marginV-10>
            <View style={{borderRadius: 20, backgroundColor: orange, maxWidth: "60%", minWidth: "20%"}} paddingV-10 paddingH-20>
                <Text text70 white>
                    {msg.content}
                </Text>
            </View>
        </View>
    )
}
