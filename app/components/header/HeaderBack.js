import React from 'react'
import { Ionicons} from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';


export default function HeaderBarBack() {
  return (
    <View style={styles.icon} >
      <Ionicons name="ios-arrow-back" size={35} color="#F79517" />
    </View>

  )
}

const styles = StyleSheet.create({
  icon: {
    paddingBottom: 12,
    paddingLeft: 12
  },
});