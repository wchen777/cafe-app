import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Dimensions, Platform, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { Keyboard, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { View, Text, Colors, Card, Carousel, Spacings, ActionSheet } from 'react-native-ui-lib';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

export default function ImagePostContent({ setContent, content }) {
    const [showSheet, setShowSheet] = useState(false)
    const carousel = useRef(null)
    const [active, setActive] = useState(0)

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async (index) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setContent({ ...content, [index]: result.uri })
        }

        setShowSheet(false)
    };


    // const width = Dimensions.get('window').width

    const onPagePress = (index, prev) => {
        console.log("asdf")
        if (carousel && carousel.current) {
            carousel.current.goToPage(index, true);
        }
    };

    const onPlaceholderPress = (i) => {
        setActive(i)
        // weidtd bug here
        if (showSheet) {
            setShowSheet(!showSheet)
        }
        setShowSheet(!showSheet)
    }

    return (
        <TouchableWithoutFeedback marginT-13 onPress={Keyboard.dismiss}>
            <View >

                <ActionSheet
                    title='Select Image'
                    message='Image'
                    cancelButtonIndex={3}
                    useNativeIOS={false}
                    options={[{
                        label: 'Upload Image from Camera Roll', onPress: () => {
                            pickImage(active)
                        }
                    },
                    { label: 'Take Image' },
                    { label: 'Cancel', onPress: () => setShowSheet(false) },
                    ]}
                    visible={showSheet}
                    // onDismiss={() => setTimeout(() => { if (!imgActive) {
                    //     console.log(imgActive)
                    //     setShowSheet(false)
                    // }}, 1000)}
                    containerStyle={{ paddingBottom: 25 }}
                />



                <Text text40 style={{ textAlign: 'center', fontSize: 25, marginTop: 50 }}
                    marginB-13>
                    <Text
                        style={{ textAlign: 'center', fontSize: 25, marginTop: 20 }}
                        marginB-13
                        color={Colors.red40}>* </Text>Upload up to 5 images:</Text>

                <Text text70 style={{ textAlign: 'center', marginTop: 20 }}
                    marginB-13>Cover image required. </Text>
                <Text text70 style={{ textAlign: 'center'}}
                    marginB-13>
                    Images collection will be collapsed.</Text>
                <Carousel
                    ref={carousel}
                    // pageWidth={width}
                    allowAccessibleLayout
                    animated
                    pagingEnabled
                    initialPage={0}
                    itemSpacings={Spacings.s3}
                    containerStyle={{ marginTop: 20, marginBottom: 40 }}
                    pageHeight={300}
                    pageControlPosition={Carousel.pageControlPositions.UNDER}
                    allowAccessibleLayout
                    pageControlProps={{ onPagePress: (index) => onPagePress(index) }}
                >
                    {/* {_.map([...Array(numberOfPagesShown)], (item, index) => (
                        <Page
                            style={{ backgroundColor: BACKGROUND_COLORS[index] }}
                            key={index}
                        >
                            <Text margin-15>CARD {index}</Text>
                        </Page>
                    ))} */}


                    <TouchableOpacity onPress={() => onPlaceholderPress("first")}>
                        {content["first"] !== undefined ?
                            <Image source={{ uri: content["first"] }} style={{ width: 340, height: 250, alignSelf: 'center' }} /> :
                            <View style={styles.card} backgroundColor={Colors.grey50} key={0}>
                                <Feather name="plus-circle" size={50} color="white" style={{ alignSelf: 'center' }} />
                                <Text style={{ alignSelf: 'center' }} marginT-15 white text50>
                                    (Cover Image)
                            </Text>
                            </View>}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { onPlaceholderPress("second") }}>
                        {content["second"] !== undefined ?
                            <Image source={{ uri: content["second"] }} style={{ width: 340, height: 250, alignSelf: 'center' }} /> :
                            <View style={styles.card} backgroundColor={Colors.grey50} key={1}>
                                <Feather name="plus-circle" size={50} color="white" style={{ alignSelf: 'center' }} />
                            </View>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPlaceholderPress("third")}>
                        {content["third"] !== undefined ?
                            <Image source={{ uri: content["third"] }} style={{ width: 340, height: 250, alignSelf: 'center' }} /> :
                            <View style={styles.card} backgroundColor={Colors.grey50} key={2}>
                                <Feather name="plus-circle" size={50} color="white" style={{ alignSelf: 'center' }} />
                            </View>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPlaceholderPress("fourth")}>
                        {content["fourth"] !== undefined ?
                            <Image source={{ uri: content["fourth"] }} style={{ width: 340, height: 250, alignSelf: 'center' }} /> :
                            <View style={styles.card} backgroundColor={Colors.grey50} key={3}>
                                <Feather name="plus-circle" size={50} color="white" style={{ alignSelf: 'center' }} />
                            </View>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => onPlaceholderPress("fifth")}>
                        {content["fifth"] !== undefined ?
                            <Image source={{ uri: content["fifth"] }} style={{ width: 340, height: 250, alignSelf: 'center' }} /> :
                            <View style={styles.card} backgroundColor={Colors.grey50} key={4}>
                                <Feather name="plus-circle" size={50} color="white" style={{ alignSelf: 'center' }} />
                            </View>
                        }
                    </TouchableOpacity>


                </Carousel>


            </View>

        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    card: {
        width: 340,
        height: 250,
        borderRadius: 8,
        alignSelf: 'center',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    }
});
