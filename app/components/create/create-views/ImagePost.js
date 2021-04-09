import React, { useState, useEffect } from 'react'
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button, Image} from 'react-native'
import { Text, View, TextField, TextArea, Colors, Wizard, Card } from 'react-native-ui-lib';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

export default function ImagePost({ setContent }) {

    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
  
    useEffect(() => {
      (async () => {
        const cameraStatus = await Camera.requestPermissionsAsync();
        setHasCameraPermission(cameraStatus.status === 'granted');

        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(galleryStatus.status === 'granted');
      })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
    };
  
    if (hasCameraPermission === null || hasGalleryPermission === false) {
      return <View />;
    }
    if (hasCameraPermission === false || hasGalleryPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
            <View style={styles.container}>
                <View style={styles.cameraContainer}>
                    <Camera 
                        ref = {ref => setCamera(ref)}
                        style={styles.fixedRatio}
                        type={type}
                        ratio={'1: 1'}
                    />
                </View>


                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <FontAwesome name="camera" size={24} color="black" onPress={() => takePicture()}/>
                    <FontAwesome name="undo" size={24} color="black"            
                        onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                        }}
                        style={{marginLeft: 20}}
                    />
                    <FontAwesome name="image" size={24} color="black" style={{marginLeft: 20}} onPress={() => pickImage()}/>
                </View>
                <Button title="Save" onPress={()=> setContent(image)}/>
                {image && <Image source={{uri: image}} style={{width: 100, height: 100, marginLeft: 10, marginBottom: 20}}/>}
            </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    fixedRatio : {
        flex: 1,
        aspectRatio: 1
    },
    button: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
});