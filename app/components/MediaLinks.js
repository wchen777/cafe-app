import React from 'react';
import {View, Image, Text, TextField, TextArea, Button, Colors} from 'react-native-ui-lib';

export default function MediaLinks({navigation}) { 
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC'}}>
        <View style={{ flexDirection: 'column'}}>
            <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 50}}>Media Links</Text>
            <Text style={{fontSize: 15}} dark10 marginB-15 marginT-40>
                Instagram
            </Text>
            <View
                style={{
                height: 40,
                width: 220,
                borderWidth: 1,
                borderColor: Colors.dark60,
                borderRadius: 20,
                paddingLeft: 10
                }}
            >
            </View>
            <Text style={{fontSize: 15}} dark10 marginB-15 marginT-20>
                Portfolio URL
            </Text>
            <View
                style={{
                height: 40,
                width: 220,
                borderWidth: 1,
                borderColor: Colors.dark60,
                borderRadius: 20,
                paddingLeft: 10
                }}
            >
            </View>
            <Text style={{fontSize: 15}} dark10 marginB-15 marginT-20>
                Extra Links
            </Text>
            <View
                style={{
                height: 40,
                width: 220,
                borderWidth: 1,
                borderColor: Colors.dark60,
                borderRadius: 20,
                paddingLeft: 10
                }}
            >
            </View>
            <Text style={{fontSize: 15}} dark10 marginB-15 marginT-20>
                Extra Links 
            </Text>
            <View
                style={{
                height: 40,
                width: 220,
                borderWidth: 1,
                borderColor: Colors.dark60,
                borderRadius: 20,
                paddingLeft: 10
                }}
            >
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Button
                    backgroundColor="#FFB36C"
                    label="Submit"
                    labelStyle={{fontWeight: '600', fontSize: 20}}
                    style={{width: 145, marginTop: 30}}
                    onPress={() => navigation.navigate("MediaLinks")}
                    enableShadow
                />
            </View>

        </View>
    </View>
    )
}