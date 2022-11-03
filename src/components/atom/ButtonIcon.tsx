import React, { ReactElement, ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import COLORS from '../../constans/colors';
import Text from './Text';

interface ButtonProps extends TouchableOpacityProps {
    text: string;
    Icon?: ReactElement
}

const Button: React.FunctionComponent<ButtonProps> = (props) => {
    const { text, style, Icon, ...rest } = props;

    return (
        <TouchableOpacity
            style={[{
                backgroundColor: COLORS.LIGHT.PRIMARY,
                paddingVertical: 9.5,
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 45,
                flexDirection: 'row'
            }, style]}
            {...rest}>
            {Icon}
            <Text
                style={[{
                    color: COLORS.LIGHT.WHITE,
                    fontSize: 12,
                    lineHeight: 18,
                    fontWeight: '600',
                }, Icon && { marginLeft: 8.5 }]}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default Button