import React from 'react'
import { Fontisto } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';


export default function HeaderBarLogo() {
  return (
    <View style={styles.icon} >
      <Fontisto name="coffeescript" size={30} color="orange" />
    </View>

  )
}

const styles = StyleSheet.create({
  icon: {
    paddingBottom: 10
  },
});
