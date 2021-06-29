import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';

export default function HeaderBarBack() {
    return (
        <View style={styles.icon}>
            <AntDesign name="close" size={30} color="#F79517" />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        paddingBottom: 12,
        paddingLeft: 12,
    },
});
