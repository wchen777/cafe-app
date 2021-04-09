import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native';

import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, RadioButton, RadioGroup } from 'react-native-ui-lib';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function ImageInfo({ setInfo, info }) {

    useEffect(() => {
        setInfo({...info, category: 'Painting'})
    }, [])
    return (
    <TouchableWithoutFeedback marginT-13 onPress={Keyboard.dismiss}>
        <View >
            <Text text40 style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }}
                marginB-13>
                <Text  style={{ textAlign: 'center', fontSize: 25, marginTop: 20, color: 'red' }} marginB-13>*</Text>Enter a title:
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <TextInput
                    backgroundColor="#ffffff"
                    text50
                    floatOnFocus
                    onChangeText={(t) => setInfo({...info, title: t})}
                    placeholder="A title of your choosing"
                    width="90%"
                    multiline={false}
                    style={{ paddingVertical: 5, paddingHorizontal: 10, minHeight: 50, marginBottom: 25 }}
                />
            </View>

            <Text text40 style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }}
                marginB-13>
                <Text  style={{ textAlign: 'center', fontSize: 25, marginTop: 20, color: 'red' }} marginB-13>*</Text>Enter a description:
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                <TextInput
                    backgroundColor="#ffffff"
                    text50
                    floatOnFocus
                    onChangeText={(t) => setInfo({...info, description: t})}
                    placeholder="A brief description about your post"
                    width="90%"
                    multiline={true}
                    style={{ paddingTop: 15, paddingHorizontal: 10, minHeight: 150, marginBottom: 25 }}
                />
            </View>

            <Text text40 style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }}
                marginB-13>
                Category:
            </Text>

            {/* onValueChange={value => this.setState({ textSide: value })} */}
            <RadioGroup marginB-20 marginT-10 marginL-55 initialValue={info.category} onValueChange={value => setInfo({...info, category: value})}>

                <RadioButton value="Painting" label="Writing" marginB-9 color={'#FFB36C'}/>

                <RadioButton value="Digital Art" label="Digital Art" marginB-9 color={'#FFB36C'}/>

                <RadioButton value="Design" label="Design" marginB-9 color={'#FFB36C'}/>

                <RadioButton value="Photography" label="Photography" marginB-9 color={'#FFB36C'}/>

                <RadioButton value="Other" label="Other" marginB-9 color={'#FFB36C'}/>

            </RadioGroup>



        </View>

    </TouchableWithoutFeedback>

    )
}