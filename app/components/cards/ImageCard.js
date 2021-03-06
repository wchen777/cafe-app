import React from 'react'
import { View, Text, Colors, Card, AnimatedImage } from 'react-native-ui-lib';

export default function ImageCard({ navigation, imagePost }) {
    let imagePostCategory;
    if (imagePost.category === 'Other (Image)') {
        imagePostCategory = 'Other'
    } else {
        imagePostCategory = imagePost.category
    }

    return (

        <Card
            key={1}
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate('PostView', imagePost)}
            borderRadius={20}
            marginH-4
        >
            <AnimatedImage
                source={{ uri: imagePost["0"] }}
                height={280}
                animationDuration={150}
                style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
            />

            <View padding-20 bg-white borderRadius={20}>
                <Text text40 color={Colors.grey10} marginV-14>
                    {imagePost.title}
                </Text>

                <View row>
                    <Text text60 color={Colors.orange30} >
                        @{imagePost.username}
                    </Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.green30}>{imagePostCategory.toLowerCase()} </Text>
                </View>

                <Text text70 color={Colors.grey10} marginV-15>
                    {imagePost.description.length > 280 ? imagePost.description.substring(0, 280) : imagePost.description}
                </Text>

                <View row style={{ justifyContent: 'space-between' }}>
                    <Text text90 color={Colors.grey50} marginT-10>
                        {imagePost.likes} likes
                    </Text>

                    <View right>
                        <Text text90 color={Colors.grey50} marginT-10>
                            {imagePost.time}
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}
