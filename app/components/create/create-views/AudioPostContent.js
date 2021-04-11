import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { View, Image, Text, TextField, TextArea, Button, Colors, Wizard, Card } from 'react-native-ui-lib';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

export default function AudioPostContent({ setContent }) {

    const [showSheet, setShowSheet] = useState(false)
    const [recording, setRecording] = React.useState();
    const [uri, setUri] = React.useState();
    const [sound, setSound] = React.useState();

    const onPlaceholderPress = () => {
        // weidtd bug here
        if (showSheet) {
            setShowSheet(!showSheet)
        }
        setShowSheet(!showSheet)
    }

     async function startRecording() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          }); 
          console.log('Starting recording..');
          const recording = new Audio.Recording();
          await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await recording.startAsync(); 
          setRecording(recording);
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const link = recording.getURI();
        setUri(link);
    }


    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            {uri}
        );
        setSound(sound);
        setContent(sound);
    
        console.log('Playing Sound');
        await sound.playAsync(); }
    
      React.useEffect(() => {
        return sound
          ? () => {
              console.log('Unloading Sound');
              sound.unloadAsync(); }
          : undefined;
    }, [sound]); 

    return (
        <TouchableWithoutFeedback marginT-13 onPress={Keyboard.dismiss}>
            <View>

{/*                 <ActionSheet
                        title='Select Audio'
                        message='Audio'
                        cancelButtonIndex={3}
                        useNativeIOS={false}
                        options={[{
                            label: 'Upload Audio from Phone', onPress: () => {
                                pickAudio(active)
                            }
                        },
                        { label: 'Record Audio' },
                        { label: 'Cancel', onPress: () => setShowSheet(false) },
                        ]}
                        visible={showSheet}
                        // onDismiss={() => setTimeout(() => { if (!imgActive) {
                        //     console.log(imgActive)
                        //     setShowSheet(false)
                        // }}, 1000)}
                        containerStyle={{ paddingBottom: 25 }}
                /> */}


                <Text text40 style={{ textAlign: 'center', fontSize: 25, marginTop: 50 }}
                        marginB-13>
                        <Text
                            style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }}
                            marginB-13
                            color={Colors.red40}
                        > * 
                        </Text>
                        Upload audio:
                </Text>

{/*                 <TouchableOpacity onPress={() => onPlaceholderPress()}>
                    <Image source={{ uri: content["first"] }} style={{ width: 340, height: 250, alignSelf: 'center' }} /> :
                    <View style={styles.card} backgroundColor={Colors.grey50} key={0}>
                        <Feather name="plus-circle" size={50} color="white" style={{ alignSelf: 'center' }} />
                        <Text style={{ alignSelf: 'center' }} marginT-15 white text50>
                            (Audio)
                    </Text>
                    </View>
                </TouchableOpacity> */}

                <View style={styles.container}>
                    <Button
                        label={recording ? 'Stop Recording' : 'Start Recording'}
                        onPress={recording ? stopRecording : startRecording}
                        style={{ width: 200 }}
                    />
                </View>

                <View style={styles.container}>
                    <Button label="Play Audio" onPress={playSound} style={{ width: 200 }} />
                </View> 






            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 10,
    },
});