import React, { useState, useContext, useRef, useEffect } from 'react'
import { StyleSheet, Alert } from 'react-native';
import Moment from 'moment';
import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, Wizard, Card, Toast } from 'react-native-ui-lib';
import TextOption from '../../../components/create/option-cards/TextOption';
import ImageOption from '../../../components/create/option-cards/ImageOption';
import AudioOption from '../../../components/create/option-cards/AudioOption';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import TextPostContent from '../../../components/create/create-views/TextPostContent';
import TextInfo from '../../../components/create/create-views/TextInfo';
import ImageInfo from '../../../components/create/create-views/ImageInfo';
import AudioPostContent from '../../../components/create/create-views/AudioPostContent';
import AudioInfo from '../../../components/create/create-views/AudioInfo';
import { v4 as uuidv4 } from 'uuid';

import { createTextPost, createImagePost, createAudioPost } from '../../../api/firebase/FirebasePosts'
import * as firebase from 'firebase';


import { AuthContext } from '../../../context/AuthContext'
import ImagePostContent from '../../../components/create/create-views/ImagePostContent';

export default function CreatePostMain({ navigation }) {
    const [index, setIndex] = useState({ active: 0, completed: -1 })
    const [selectedType, setSelectedType] = useState("Image")
    const [content, setContent] = useState({})
    const [metaInfo, setMetaInfo] = useState({})

    const [showToast, setShowToast] = useState(false)

    // not needed right now?
    const { user } = useContext(AuthContext)

    // ------------------ temporary copy ---------------

    const userData = useRef()

    let currentUserUID = firebase.auth().currentUser.uid;
    // const [userData, setUserData] = useState({});

    async function getUserInfo() {
        let doc = await firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .get();

        if (!doc.exists) {
            Alert.alert('No user data found!')
        } else {
            let dataObj = doc.data();
            // setUserData(dataObj)
            userData.current = dataObj
            console.log(userData);
        }
    }

    useEffect(() => {
        setContent({})
    }, [])

    useEffect(() => {
        getUserInfo();
        setContent({})
    }, [userData])

    // ------------------ temporary copy ---------------

    const uploadPost = () => {
        if (!content || !metaInfo.description == null || !metaInfo.title == null) {
            return Alert.alert("Please fill in all required fields.")
        }

        let post = { ...metaInfo, 
            type: selectedType, 
            username: userData.current.username, 
            content: content,
            likes: 0, 
            time: Moment().format('MMMM Do YYYY, h:mm:ss a'),
            id: uuidv4(),
        }
        switch (selectedType){
            case "Text":
                createTextPost(post)
                break;
            case "Image":
                createImagePost(post)
                break;
            case "Audio":
                createAudioPost(post)
                break;
            default:
                break;
        }
   
        // setTimeout(setShowToast(true), 3000)
        // setShowToast(false)
        navigation.goBack()
    }

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
                {/* <Toast
                    position={'top'}
                    backgroundColor={'#FFB36C'}
                    visible={showToast}
                    message="Thanks for posting!"
                    autoDismiss={3000}
                /> */}

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

                        

                        {index.active == 1 && selectedType === "Image" && <ImagePostContent setContent={setContent} content={content}/>}
                        
                        {index.active == 2 && selectedType === "Image" && <ImageInfo setInfo={setMetaInfo} info={metaInfo} />}

                        {index.active == 1 && selectedType === "Text" && <TextPostContent setContent={setContent} />}

                        {index.active == 2 && selectedType === "Text" && <TextInfo setInfo={setMetaInfo} info={metaInfo} />}

                        {index.active == 1 && selectedType === "Audio" && <AudioPostContent setContent={setContent}/>}

                        {index.active == 2 && selectedType === "Audio" && <AudioInfo setInfo={setMetaInfo} info={metaInfo} />}
                        

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

                            {index.active < 2 &&
                                <Button
                                    backgroundColor="#FFB36C"
                                    label="Next"
                                    marginL-5
                                    labelStyle={{ fontWeight: '600', fontSize: 20 }}
                                    style={{ width: 150 }}
                                    onPress={() => nextStep(1)}
                                    enableShadow
                                />}

                            {/* TEMPORARY PURPOSES */}
                            {index.active == 2 &&
                                <Button
                                    backgroundColor="#FFB36C"
                                    label="Post!"
                                    marginL-5
                                    labelStyle={{ fontWeight: '600', fontSize: 20 }}
                                    style={{ width: 150 }}
                                    onPress={() => uploadPost()}
                                    enableShadow
                                />}

                        </View>

                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}
