import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, ActionBar, Card } from 'react-native-ui-lib';


export default function CreatePatio({ navigation }) {


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#FFFDFC', marginBottom: 0, paddingBottom: 0, padding: 0, margin: 0  }}>
                
                <Text>
                    Patio coming soon!
                </Text>
            </View>


        </TouchableWithoutFeedback>
    )
}