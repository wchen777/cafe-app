import React, { useState, useEffect, useContext } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';

export default function OtherMessage({ msg }) {

    return (
        <View row style={{width: "100%", justifyContent: 'flex-start'}} marginL-20 key={msg.uuid} marginV-10>
            <View style={{borderRadius: 20, backgroundColor: "#dddddd", maxWidth: "60%", minWidth: "20%"}} paddingV-10 paddingH-20>
                <Text text70>
                    {msg.content}
                </Text>
            </View>
        </View>
    )
}
