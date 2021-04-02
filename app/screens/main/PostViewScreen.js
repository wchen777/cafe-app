import React from 'react'
import { StyleSheet } from 'react-native';
import { View, Text } from 'react-native-ui-lib';

export default function PostViewScreen( {navigation} ) {
    return (
        <View style={styles.container} >
            <Text>
                information about post here
            </Text>
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
