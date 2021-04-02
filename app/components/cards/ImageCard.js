import React from 'react'
import { View, Text, Colors, Card } from 'react-native-ui-lib';


const testImage2 = '../../assets/monet1.jpeg'
const testImage = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/irises-in-monets-garden-at-giverny-claude-monet.jpg'


export default function ImageCard({ navigation }) {
    return (

        <Card
            key={1}
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate('PostView')}
            borderRadius={20}
            marginH-4
        >
            <Card.Image
                source={{ uri: testImage }}
                height={270}
            />

            <View padding-20 bg-white borderRadius={20}>
                <Text text40 color={Colors.grey10} marginV-14>
                    Monet: The Garden Paintings
            </Text>

                <View row>
                    <Text text60 color={Colors.orange30} >
                        @claudemonet
                </Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.green50}>painting </Text>
                </View>

                <Text text70 color={Colors.grey10} marginT-10>
                    description descripton descirption descriprion description,
                     need to add like and comment buttons + symbols + timestamp, limit description length
            </Text>

                <View>
                    <Text text90 color={Colors.grey50} marginT-10>
                        100 Likes
                    </Text>

                    <View row right>
                        
                        {/* <Button
                        style={{ marginRight: 10 }}
                        text90
                        link
                        iconSource={featureIcon}
                        label="Feature"
                    /> */}
                        {/* <Button text90 link iconSource={shareIcon} label="Share" /> */}
                    </View>
                </View>
            </View>
        </Card>
    )
}
