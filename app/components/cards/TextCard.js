import React from 'react'
import { View, Text, Colors, Card } from 'react-native-ui-lib';

//use map here or no?
export default function TextCard({ navigation, textPost}) {
    return (
        <Card
            key={1}
            style={{ marginBottom: 20 }}
            onPress={() => navigation.navigate('PostView', textPost)}
            borderRadius={20}
            marginH-4
        >

            <View padding-20 bg-white borderRadius={20}>
                <Text text40 color={Colors.grey10} marginV-14>
                    {textPost.title}
                </Text>

                <View row>
                    <Text text60 color={Colors.orange30} >
                        @{textPost.username}
                    </Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.red30}>{textPost.category.toLowerCase()} </Text>
                </View>

                <Text text70 color={Colors.grey10} marginV-15>
                    {textPost.description.length > 280 ? textPost.description.substring(0, 280): textPost.description}
                </Text>

                <View row style={{justifyContent: 'space-between'}}>
                    <Text text90 color={Colors.grey50} marginT-10>
                        {textPost.likes} likes 
                    </Text>

                    <View right>

                        {/* <Button
                                style={{ marginRight: 10 }}
                                text90
                                link
                                iconSource={featureIcon}
                                label="Feature"
                            /> */}
                        {/* <Button text90 link iconSource={shareIcon} label="Share" /> */}
                        <Text text90 color={Colors.grey50} marginT-10>
                            {textPost.time}
                        </Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}
