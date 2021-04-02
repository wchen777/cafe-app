import React from 'react'
import { Fontisto } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

export default function SplashScreen() {
    return (
        <View style={styles.container} >
            <Fontisto name="coffeescript" size={50} color="orange" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });