import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/login/Landing';
import SignUpScreen from './screens/login/SignUp';
import MediaLinks from './screens/login/MediaLinks';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LandingScreen'>
        <Stack.Screen
          name='Landing'
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='SignUp'
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='MediaLinks'
          component={MediaLinks}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
