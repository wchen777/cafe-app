import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Text, Colors } from 'react-native-ui-lib';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native'


export default function PostViewScreen({ navigation, route }) {
    const post = route.params

    return (
        <View style={styles.container} >
            <Text text40 color={Colors.grey10} marginB-14 marginT-45>
                {post.title}
            </Text>

            <View row>
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
                <View row marginT-28 padding-10>

                    <FontAwesome name="heart-o" size={35} color="#4d4d4d" />
                    <Text text90 color={"#4d4d4d"} marginT-10 style={{ fontSize: 15, paddingTop: 6 }} marginL-4>
                        x100
                    </Text>
                    
                    <Text text80 marginL-30 marginT-10 color={"#4d4d4d"}>
                        On <Text text70BO >{post.time}</Text>
                    </Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
});
