import React from 'react'
import { View, Text, Colors, Card } from 'react-native-ui-lib';


export default function ImageCard( { navigation } ) {
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
                    Diamond as Big as the Ritz
            </Text>

                <View row>
                    <Text text60 color={Colors.orange30} >
                        @fsfitzgerald
                </Text>
                    <Text text60 color={Colors.grey10}> | </Text>
                    <Text text70 color={Colors.red50}>writing </Text>
                </View>

                <Text text70 color={Colors.grey10} marginT-10>
                    not sure what to do for writing, this is ok i think,
                    description descripton descirption descriprion description
            </Text>

                <View>
                    <Text text90 color={Colors.grey50} marginT-10>
                        120 Likes
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
