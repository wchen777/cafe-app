import { Button } from 'react-native-ui-lib';
import React from 'react';

export default function OutlineButton({ onPress, label }) {
    const orange = '#f79a43';

    return (
        <Button
            label={label}
            backgroundColor="#FFFDFC"
            outlineColor={orange}
            borderRadius={10}
            outlineWidth={1}
            labelStyle={{ fontWeight: '600', fontSize: 17, color: orange }}
            style={{ width: 200, marginTop: 20 }}
            onPress={onPress}
            enableShadow
        />
    );
}
