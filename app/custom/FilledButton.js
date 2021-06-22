import React from 'react';
import { Button } from 'react-native-ui-lib';

export default function FilledButton({ onPress, label }) {
    const orange = '#f79a43';

    return (
        <Button
            backgroundColor={orange}
            label={label}
            labelStyle={{ fontWeight: '600', fontSize: 17 }}
            text30
            borderRadius={10}
            style={{
                width: 200,
                marginTop: 30,
                paddingTop: 0,
                paddingBottom: 0,
            }}
            onPress={onPress}
            enableShadow
        />
    );
}
