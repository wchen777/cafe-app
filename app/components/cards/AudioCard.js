import React from 'react'
import { View, Text, Colors, Card } from 'react-native-ui-lib';


export default function AudioCard({ navigation, audioPost }) {
    return (

        <Card
            key={1}
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate('PostView')}
            borderRadius={20}
            marginH-4
        >
          
            <View padding-20 bg-white borderRadius={20}>
                <Text text40 color={Colors.grey10} marginV-14>
                    {audioPost.title}
            </Text>

                <View row>
                    <Text text60 color={Colors.orange30} >
                        @{audioPost.username}
                </Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.blue30}>{audioPost.category.toLowerCase()} </Text>
                </View>

                <Text text70 color={Colors.grey10} marginT-10>
                    {audioPost.description}
            </Text>

                <View>
                    <Text text90 color={Colors.grey50} marginT-10>
                        150 Likes
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
