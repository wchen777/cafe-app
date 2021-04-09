import React, { useRef, useState } from 'react'
import { StyleSheet, Touchable } from 'react-native';
import { View, Text, Colors, Carousel, Spacings, AnimatedImage } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Image, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';


export default function PostViewScreen({ navigation, route }) {
    const post = route.params
    const carousel = useRef(null)

    const windowWidth = Dimensions.get('window').width;
    console.log(windowWidth)
    const w = 0.8 * windowWidth
    const h = 0.6 * windowWidth
    console.log(w)
    const onPagePress = (index, prev) => {
        console.log("asdf")
        if (carousel && carousel.current) {
            carousel.current.goToPage(index, true);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container} >

                <Text text40 color={Colors.grey10} marginB-14 marginT-45>
                    {post.title}
                </Text>

                <View row marginT-7>
                    <Text text70>
                        by
                </Text>
                    <Text text60 color={Colors.orange30} marginL-4>
                        @{post.username}
                    </Text>
                    <Text text60 color={Colors.grey10}>  |  </Text>
                    <Text text70>
                        category:
                    </Text>
                    <Text text70 color={Colors.green30} marginL-4>{post.category.toLowerCase()} </Text>
                </View>

                <TouchableOpacity>
                    <View row marginT-20 padding-10>

                        <FontAwesome name="heart-o" size={35} color="#4d4d4d" />
                        <Text text90 color={"#4d4d4d"} marginT-10 style={{ fontSize: 15, paddingTop: 6 }} marginL-4>
                            x100
                        </Text>

                        <Text text80 marginL-25 marginT-10 color={"#4d4d4d"}>
                            On <Text text70BO >{post.time}</Text>
                        </Text>
                    </View>
                </TouchableOpacity>

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
                        style={{paddingBottom: 0}}
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

                <View>
                    <Text text70 style={{width: 320}}>
                        {post.description}
                    </Text>
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
});
