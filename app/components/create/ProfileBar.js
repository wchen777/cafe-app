import React from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    DevSettings,
    RefreshControl,
} from 'react-native';
import {
    View,
    Button,
    Avatar,
    Colors,
    Text,
    Card,
    TextArea,
    Constants,
    Drawer,
    ActionSheet,
} from 'react-native-ui-lib';
import { lightOrange } from '../../styles/Colors';

export default function ProfileBar({ userData }) {
    const getInitials = () => {
        return (
            userData.first.toUpperCase().charAt(0) +
            userData.last.toUpperCase().charAt(0)
        );
    };

    return (
        <View style={styles.container}>
            {userData.pic === '' ? (
                <Avatar
                    size={65}
                    label={getInitials()}
                    labelColor={Colors.orange30}
                    backgroundColor={lightOrange}
                />
            ) : (
                <Avatar size={150} source={{ uri: userData.pic }} />
            )}
            <View style={{ flexDirection: 'column', marginLeft: 16 }}>
                <Text text60 marginB-4>
                    {userData.first} {userData.last}
                </Text>
                <Text text60 color={Colors.orange30}>
                    @{userData.username}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 24,
        marginVertical: 16,
    },
});
