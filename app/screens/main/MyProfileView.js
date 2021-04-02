import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { View, Button, Avatar, Colors} from 'react-native-ui-lib';


import { signOut } from '../../api/firebase/FirebaseAuth'


export default function MyProfileView( {navigation, userData } ) {

    // useEffect(() => {
    //     console.log("asdff")
    //     navigation.setOptions({headerShown: false});
    // }, [navigation])
   

    const orange = '#FFB36C'
    const lightOrange = '#ffdfc2'

    console.log(userData)

    return (
        <View style={{ flexDirection: 'column', marginBottom: 0, paddingBottom: 0 }}>


            <ScrollView style={{ marginBottom: 80, paddingTop: 50 }}>

                

                <View style={{...styles.centering, marginTop: 20}}>
                    <Avatar size={150} label='TT' labelColor={Colors.orange30} backgroundColor={lightOrange}/>
                </View>



                <View style={styles.centering}>
                    <Button
                        backgroundColor="#FFB36C"
                        label="Sign Out"
                        labelStyle={{ fontWeight: '600', fontSize: 20 }}
                        style={{ width: 145, marginTop: 30, marginBottom: 40 }}
                        onPress={() => signOut()}
                        enableShadow
                    />
                </View>

                {/* whitespace block */}
                <View style={{ height: 40 }} />


            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    centering: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        textAlign: 'center' }
  });