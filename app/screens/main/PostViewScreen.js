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


export default function PostViewScreen({ navigation, route }) {
    const userData = useRef()
    const [post, setPostDataC] = useState(route.params);
    const [comment, setComment] = useState(null);
    //const {userData, setUserData} = useContext(AuthContext);
    let numberOfLikes = post.likes;
    let postComments = post.comments;
    const carousel = useRef(null)

    const windowWidth = Dimensions.get('window').width;
    const w = 0.8 * windowWidth
    const h = 0.6 * windowWidth
    const onPagePress = (index, prev) => {
        if (carousel && carousel.current) {
            carousel.current.goToPage(index, true);
        }
    }

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

    const editLikes = () => {
        numberOfLikes++;
        setPostDataC({ ...post, likes: numberOfLikes });
        updateLikes(post.id, numberOfLikes);
        // might have to set the state here
        route.params = post;
    }

     const addComment = (comment) => {
        postComments.push({
            "username": userData.current.username,
            "time": Moment().format('MMMM Do YYYY, h:mm:ss a'),
            "comment": comment, 
        });
        setPostDataC({ ...post, comments: postComments });
        updateComments(post.id, postComments);
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
                    <ListItem.Part middle column containerStyle={[styles.border, {paddingRight: 17}]}>
                    <View backgroundColor="white" style={{flexDirection: 'column', marginLeft: 20 }}>
                    <ListItem.Part containerStyle={{marginBottom: 3}}>
                        <Text dark10 text70 style={{marginTop: 2}}>@{u.username}    {u.comment}</Text>
                        </ListItem.Part>
                        <ListItem.Part>
                        <Text style={{flex: 1}} text90 dark40 numberOfLines={1}>{u.time}</Text>
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
                <View paddingH-10>
                    <Text text40 color={Colors.grey10} marginB-14 marginT-45>
                        {post.title}
                    </Text>
                </View>


                <View row marginT-7>
                    <Text text70>
                        by
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("OtherProfile", { username: post.username })}>
                        <Text text60 color={Colors.orange30} marginL-4>
                            @{post.username}
                        </Text>
                    </TouchableOpacity>

                    <Text text60 color={Colors.grey10}>  |  </Text>
                    <Text text70>
                        category:
                </Text>
                    <Text text70 color={Colors.green30} marginL-4>{post.category.toLowerCase()} </Text>
                </View>


                <View row marginT-20 padding-10>
                    <Text text80 marginT-10 color={"#4d4d4d"}>
                        On <Text text70BO >{post.time}</Text>
                    </Text>
                </View>


                <View marginV-20>
                    <Text text70 style={{ width: 350 }}>
                        <Text text60 color={Colors.grey10} fontSize={20}> Description: </Text>
                        {post.description}

                    </Text>
                </View>


                {post.type === "Text" &&
                    <View backgroundColor="white" paddingH-20 style={{ minHeight: 450 }}>
                        <Text text70 style={{ width: 320 }} marginV-20>
                            {post.content}
                        </Text>
                    </View>
                }

                {post.type === "Image" &&
                    <Carousel
                        ref={carousel}
                        allowAccessibleLayout
                        animated
                        pagingEnabled
                        initialPage={0}
                        horizontal
                        itemSpacings={Spacings.s3}
                        containerStyle={{ marginTop: 25, paddingBottom: 0 }}
                        style={{ paddingBottom: 0 }}
                        pageControlPosition={Carousel.pageControlPositions.OVER}
                        allowAccessibleLayout
                        pageControlProps={{ onPagePress: (index) => onPagePress(index) }}
                    >

                        {/* can refactor this entire carousel into a component, also each image */}

                        {/* add click to view, fix carousel bug */}
                        {post["0"] &&
                            <TouchableOpacity>
                                <AnimatedImage source={{ uri: post["0"] }} style={{ width: w, height: h, alignSelf: 'center' }} animationDuration={150} />
                            </TouchableOpacity>
                        }

                        {post["1"] &&
                            <AnimatedImage source={{ uri: post["1"] }} style={{ width: w, height: h, alignSelf: 'center' }} animationDuration={150} />
                        }
                        {post["2"] &&
                            <AnimatedImage source={{ uri: post["2"] }} style={{ width: w, height: h, alignSelf: 'center' }} animationDuration={150} />
                        }
                        {post["3"] &&
                            <AnimatedImage source={{ uri: post["3"] }} style={{ width: w, height: h, alignSelf: 'center' }} animationDuration={150} />
                        }
                        {post["4"] &&
                            <AnimatedImage source={{ uri: post["4"] }} style={{ width: w, height: h, alignSelf: 'center' }} animationDuration={150} />
                        }
                        {post["5"] &&
                            <AnimatedImage source={{ uri: post["5"] }} style={{ width: { w }, height: { h }, alignSelf: 'center' }} animationDuration={150} />
                        }
                    </Carousel>

                }

                    <View style={{flexDirection: 'row', width: 350, marginTop: 20, marginBottom: 40}}>

                        <TouchableOpacity onPress={() => editLikes()}>
                            <View row>
                                <FontAwesome name="heart-o" size={35} color="#4d4d4d" />
                                <Text text90 color={"#4d4d4d"} marginT-10 style={{ fontSize: 15, paddingTop: 6 }} marginL-4>
                                    x{post.likes}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('CommentView', post)}>
                            <View style={{marginLeft: 20}}>
                                <FontAwesome name="comment" size={35} color="#4d4d4d" />
                            </View>
                        </TouchableOpacity>
                    </View>

{/*                 <View style={{marginTop: 30}}>
                    <Text text60 color={Colors.grey10} fontSize={20} style={{ width: 350 }} color={Colors.orange30}> Comments </Text>
                </View>

                <View style={{marginTop: 10, width: '100%' }}>
                    <FlatList
                        data={postComments}
                        renderItem={({ item, index }) => renderRow(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View>
                    <Text text70 dark10 marginB-15 marginT-20>
                        Add a comment
                    </Text>
                    <TextInput
                        placeholder="comment"
                        autoCorrect={false}
                        onChangeText={comment => setComment(comment)}
                        style={styles.input}
                    />
                </View>
                <View>
                <Button
                            backgroundColor="#FFB36C"
                            label="Comment"
                            labelStyle={{ fontWeight: '600', fontSize: 20 }}
                            style={{ width: 145, marginTop: 40, marginBottom: 40}}
                            enableShadow
                            onPress={() => addComment(comment)}
                />
                </View> */}


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
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.dark70,
    }
});
