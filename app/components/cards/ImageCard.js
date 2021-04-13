import React from 'react'
import { View, Text, Colors, Card, AnimatedImage } from 'react-native-ui-lib';


const testImage2 = '../../assets/monet1.jpeg'
const testImage = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/irises-in-monets-garden-at-giverny-claude-monet.jpg'


// NEED TO CACHE IMAGES LATER, LOADING IS VERY SLOW

export default function ImageCard({ navigation, imagePost }) {
    
    return (

        <Card
            key={1}
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate('PostView', imagePost)}
            borderRadius={20}
            marginH-4
        >
            <AnimatedImage
                source={{ uri: imagePost["0"]}}
                height={280}
                animationDuration={150}
                style={{borderTopLeftRadius: 20, borderTopRightRadius: 20}}
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
                    <Text text70 color={Colors.green30}>{imagePost.category.toLowerCase()} </Text>
                </View>

                <Text text70 color={Colors.grey10} marginT-10>
                    {imagePost.description}
                </Text>

                <View row style={{justifyContent: 'space-between'}}>
                    <Text text90 color={Colors.grey50} marginT-10>
                        {imagePost.likes} likes
                    </Text>

                    <View ight>
                    <Text text90 color={Colors.grey50} marginT-10>
                            {imagePost.time}
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}
