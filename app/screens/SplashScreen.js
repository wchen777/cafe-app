import React from 'react'
import { Fontisto } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import { View } from 'react-native-ui-lib';

export default function SplashScreen() {
    return (
        <View style={styles.container} >
            <Image 
                source={require('../assets/logo-small.png')} 
                style={{ width: 65, height: 65 }}
                />

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