import React from 'react'
import { View, Text, Colors, Card } from 'react-native-ui-lib';


export default function ImageCard() {
    return (

        <Card
            key={1}
            style={{ marginBottom: 20 }}
            onPress={() => console.log('card press')}
            borderRadius={20}
        >
          
            <View padding-20 bg-white borderRadius={20}>
                <Text text40 color={Colors.grey10} marginV-14>
                    Beethoven: 5th Symphony
            </Text>

                <View row>
                    <Text text60 color={Colors.orange30} >
                        @beethoven
                </Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.blue50}>music </Text>
                </View>

                <Text text70 color={Colors.grey10} marginT-10>
                    would like an embedded audio player somewhere above the title, 
                    description descripton descirption descriprion description
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
