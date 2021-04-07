import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, Wizard, Card } from 'react-native-ui-lib';
import TextOption from '../../../components/create/option-cards/TextOption';
import ImageOption from '../../../components/create/option-cards/ImageOption';
import AudioOption from '../../../components/create/option-cards/AudioOption';
import { ScrollView } from 'react-native-gesture-handler';



export default function CreatePostMain({ navigation }) {
    const [index, setIndex] = useState({ active: 0, completed: -1 })
    const [selectedType, setSelectedType] = useState("Image")

    const getStepState = (i) => {

        let state = Wizard.States.DISABLED;
        if (index.completed > i - 1) {
            state = Wizard.States.COMPLETED;
        } else if (index.active === i || index.completed === i - 1) {
            state = Wizard.States.ENABLED;
        }

        return state;
    }

    const nextStep = (inc) => {
        setIndex({ active: index.active + inc, completeted: index.completed + inc })
    }

    const onActiveIndexChanged = (act) => {
        setIndex({ ...index, active: act })
    }

    const onBack = () => {
        if (index.active == 0) {
            navigation.goBack()
        } else {
            nextStep(-1)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center' }}>

                <View style={{ width: "100%", maxHeight: 100 }}>
                    <Wizard testID={'create-post.wizard'} activeIndex={index.active} onActiveIndexChanged={onActiveIndexChanged}>
                        <Wizard.Step state={getStepState(0)} label={'Choose Type'} />
                        <Wizard.Step state={getStepState(1)} label={'Post content'} />
                        <Wizard.Step state={getStepState(2)} label={'Title and description'} />
                    </Wizard>
                </View>


                <ScrollView>


                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

                        {index.active == 0 &&
                            <View marginT-13>


                                <ImageOption selectedType={selectedType} press={setSelectedType} />

                                <AudioOption selectedType={selectedType} press={setSelectedType} />

                                <TextOption selectedType={selectedType} press={setSelectedType} />

                            </View>}

                        {index.active == 1 && selectedType === "Text" &&
                            <TouchableWithoutFeedback marginT-13 onPress={Keyboard.dismiss}>
                                <View>


                                    <Text text40 style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }}>Enter your thoughts: </Text>

                                    <TextField
                                        backgroundColor="#ffffff"
                                        text70
                                        floatOnFocus
                                        width="80%"
                                        height={500}
                                        style={{ minHeight: 150, marginTop: 0, paddingTop: 0, marginHorizontal: 10, paddingHorizontal: 10 }}
                                        floatOnFocus
                                    />
                                </View>

                            </TouchableWithoutFeedback>}




                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Button
                                backgroundColor="#FFB36C"
                                label="Back"
                                marginR-5
                                labelStyle={{ fontWeight: '600', fontSize: 20 }}
                                style={{ width: 145 }}
                                onPress={() => onBack()}
                                enableShadow
                            />
                            <Button
                                backgroundColor="#FFB36C"
                                label="Next"
                                marginL-5
                                labelStyle={{ fontWeight: '600', fontSize: 20 }}
                                style={{ width: 150 }}
                                onPress={() => nextStep(1)}
                                enableShadow
                            />

                        </View>

                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}
