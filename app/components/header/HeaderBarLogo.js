import React from 'react'
import { Fontisto } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import { View } from 'react-native-ui-lib';


export default function HeaderBarLogo() {
    return (
        <View style={styles.view}>
            <Image
                source={require('../../assets/logo-small.png')}
                style={styles.icon}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 48,
        height: 48,
        bottom: 7
    },
    view: {
        paddingBottom: 5
    }
});
