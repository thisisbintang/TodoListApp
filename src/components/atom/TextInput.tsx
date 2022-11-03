import React from 'react'
import { StyleSheet, TextInput as RNTextInput, TextInputProps } from 'react-native'
import COLORS from '../../constans/colors';

const TextInput: React.FunctionComponent<TextInputProps> = (props) => {
    const { style, ...rest } = props;

    return (
        <RNTextInput
            style={[style, {
                fontFamily: 'Poppins',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 21,
                paddingHorizontal: 16.47,
                paddingTop: 16,
                paddingBottom: 15,
                borderWidth: StyleSheet.hairlineWidth,
                borderRadius: 6,
            }]}
            placeholderTextColor={COLORS.LIGHT.GRAY1}
            {...rest} />
    )
}

export default TextInput