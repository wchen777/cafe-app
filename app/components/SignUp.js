import React from 'react';
import {View, Image, Text, TextField, TextArea, Button, Colors} from 'react-native-ui-lib';

export default function SignUp({navigation}) { 
    return (
        <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#FFFDFC'}}>
            <View style={{ flexDirection: 'column'}}>
                <Text style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 50}}>Sign Up</Text>
                <Text style={{fontSize: 15}} dark10 marginB-15 marginT-20>
                    First Name
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
                <Text style={{fontSize: 15}} dark10 marginB-15 marginT-15>
                    Last Name
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
                <Text style={{fontSize: 15}} dark10 marginB-15 marginT-15>
                    Date of Birth
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
                    <TextArea placeholder="mm/dd/yy"/>
                </View>
                <Text style={{fontSize: 15}} dark10 marginB-15 marginT-15>
                    Email
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
                <Text style={{fontSize: 15}} dark10 marginB-15 marginT-15>
                    Password
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
                    <TextArea placeholder="********"/>
                </View>
                <Text style={{fontSize: 15}} dark10 marginB-15 marginT-15>
                    Retype Password
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
                    <TextArea placeholder="********"/>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button
                        backgroundColor="#FFB36C"
                        label="Continue"
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