import React from 'react'
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { ActionBar, View, Text, Button } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';

export default function ActionBarHome({ selectedPage, setSelectedPage }) {
    const orange = '#FFB36C'
    const grey = '#d6d6d6'

    const setColor = (menu) => {
       if (selectedPage === menu) {
           return orange
       } else {
           return grey
       }
    }


    return (
        <View bg-white style={styles.bar}>
            <View style={styles.iconRow}>
                <MaterialIcons name="home" size={32} color={setColor("Home")} 
                    onPress={() => setSelectedPage("Home")}/>

                <MaterialCommunityIcons name="telescope" size={34} color={setColor("Explore")} 
                    onPress={() => setSelectedPage("Explore")}/>



                <Button
                    style={{position: 'relative', zIndex: 2, height: 60, bottom: 30, width: "0%" }}
                    label={<MaterialCommunityIcons name="draw" size={26} color="white" />}
                    avoidInnerPadding
                    labelStyle={{ padding: 0, zIndex: 3, marginTop: 5, position: 'relative', fontSize: 40}}
                    backgroundColor={orange}
                    borderRadius={20}
                    enableShadow
                    size="small"
                />




                <Entypo name="chat" size={28} color={setColor("Chat")} 
                    onPress={() => setSelectedPage("Chat")}/>

                <Ionicons name="md-person" size={27} color={setColor("Profile")} 
                    onPress={() => setSelectedPage("Profile")}/>
            </View>



        </View>





        // <ActionBar actions={[{}]} centered style={{paddingTop: 0, borderRadius: 20, shadowColor: 'grey'}}> 

        // </ActionBar>

    )
}


const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 85,
        borderRadius: 20,
        shadowColor: '#b0b0b0',
        shadowOpacity: 0.1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    absoluteContainer: {
        position: 'absolute',
        bottom: 80,
        left: 0,
        right: 0
    },
    iconRow: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
        width: '100%',
        justifyContent: 'space-evenly',
        marginBottom: 20
    }
});
