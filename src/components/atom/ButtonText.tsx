import React from 'react'
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import Text from './Text'
import COLORS from '../../constans/colors'

interface ButtonTextProps extends TouchableOpacityProps {
    text: string,
    textStyle?: StyleProp<TextStyle>
}

const ButtonText: React.FunctionComponent<ButtonTextProps> = (props) => {
    const { text, textStyle, style, ...rest } = props;

    return (
        <TouchableOpacity
            style={[{
                backgroundColor: COLORS.LIGHT.PRIMARY,
                width: 160,
                height: 54,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 45,
            }, style]}
            {...rest}
        >
            <Text
                style={[{
                    color: COLORS.LIGHT.WHITE,
                    fontWeight: '600',
                    fontSize: 16,
                    lineHeight: 24
                }, textStyle]}
            >
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonText