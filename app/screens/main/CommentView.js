import React, { useRef, useState, useContext, useEffect } from 'react'
import { StyleSheet, Touchable, DevSettings, TextInput, FlatList } from 'react-native';
import { View, Text, Colors, Carousel, Spacings, AnimatedImage, Button, ListItem } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Image, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { updateLikes, updateComments } from '../../api/firebase/FirebasePosts';
import { number } from 'prop-types';
import * as firebase from 'firebase';
import { AuthContext } from '../../context/AuthContext'
import Moment from 'moment';

export default function CommentView({ navigation, route }) {
    const userData = useRef();

    const inputRef = useRef()

    const [post, setPostDataC] = useState(route.params);
    const [comment, setComment] = useState(null);
    let postComments = post.comments;

    async function getUserInfo() {
        let currentUserUID = firebase.auth().currentUser.uid;
        let doc = await firebase
            .firestore()
            .collection('users')
            .doc(currentUserUID)
            .get();

        if (!doc.exists) {
            console.log("no data found")
        } else {
            let dataObj = doc.data();
            userData.current = dataObj
        }

    }

    useEffect(() => {
        getUserInfo()
    }, [userData])

    const addComment = (comment) => {
        let comm = {
            "username": userData.current.username,
            "time": Moment().format('MMMM Do YYYY, h:mm:ss a'),
            "comment": comment,
        }
        if (!postComments) {
            postComments = [comm]
        } else {
            postComments.push(comm);
        }

        setPostDataC({ ...post, comments: postComments });
        updateComments(post.id, postComments);
        setComment("")
        inputRef.current.clear()
    }

    function renderRow(u, id) {

        return (
            <View key={id} id={id}>
                <ListItem
                    activeBackgroundColor={Colors.dark60}
                    activeOpacity={0.3}
                    height={80.5}
                    key={id}
                >
                    <ListItem.Part middle column containerStyle={[styles.border, { paddingRight: 17 }]}>
                        <View backgroundColor="white" style={{ flexDirection: 'column', marginLeft: 20 }}>
                            <ListItem.Part containerStyle={{ marginBottom: 3 }} marginV-10>
                                <Text dark10 text70 style={{ marginTop: 2 }}><Text color={Colors.orange30} text60>@{u.username}</Text>    {u.comment}</Text>
                            </ListItem.Part>
                            <ListItem.Part marginV-10>
                                <Text style={{ flex: 1 }} text90 dark40 numberOfLines={1}>{u.time}</Text>
                            </ListItem.Part>
                        </View>
                    </ListItem.Part>
                </ListItem>
            </View>
        );
    }

    return (

        <ScrollView>
            <View style={styles.container} >

                <View style={{ marginTop: 30 }}>
                    <Text text60 color={Colors.grey10} fontSize={20} style={{ width: 350 }}> Comments </Text>
                </View>

                <View style={{ marginTop: 10, width: '100%' }}>
                    <FlatList
                        data={postComments}
                        renderItem={({ item, index }) => renderRow(item, index)}
                        keyExtractor={(item, index) => index.toString()} />
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, bottom: 0, marginHorizontal: 10 }} >
                    <View>
                        <TextInput
                            ref={inputRef}
                            placeholder="comment"
                            style={styles.textInput}
                            autoCorrect={false}
                            onChangeText={comment => setComment(comment)}
                            onSubmitEditing={() => addComment(comment)}
                        />
                    </View>

                    <View marginT-8 marginL-13>
                        <TouchableOpacity onPress={() => addComment(comment)}>
                            <FontAwesome name="send" size={34} color="#FFB36C" />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </ScrollView>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 320,
        borderWidth: 1,
        borderColor: Colors.dark60,
        borderRadius: 20,
        paddingLeft: 10
    },
    border: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.dark60,
    },
    textInput: {
        height: 52,
        marginBottom: 36,
        minWidth: "80%",
        backgroundColor: "#ffffff",
        borderColor: "#eeeeee",
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 20
    },
});