import React from 'react'
import { FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { ActionBar, View, Text, Button } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function ActionBarHome({ selectedPage, setSelectedPage, navigation }) {
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

                <TouchableWithoutFeedback hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => setSelectedPage("Home")}>
                    <MaterialIcons name="home" size={32} color={setColor("Home")}
                         />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => setSelectedPage("Explore")} >
                    <MaterialCommunityIcons name="telescope" size={34} color={setColor("Explore")}/>
                </TouchableWithoutFeedback>


                <Button
                    style={{ position: 'relative', zIndex: 2, height: 60, bottom: 30, width: "0%" }}
                    label={<MaterialCommunityIcons name="draw" size={26} color="white" />}
                    avoidInnerPadding
                    labelStyle={{ padding: 0, zIndex: 3, marginTop: 5, position: 'relative', fontSize: 40 }}
                    backgroundColor={orange}
                    borderRadius={20}
                    enableShadow
                    onPress={() => navigation.navigate("CreatePostMain")}
                    size="small"
                />



                <TouchableWithoutFeedback hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => setSelectedPage("Chat")}>
                    <Entypo name="chat" size={28} color={setColor("Chat")}
                         />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={() => setSelectedPage("Profile")} >
                    <Ionicons name="md-person" size={27} color={setColor("Profile")}
                        />
                </TouchableWithoutFeedback>

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
