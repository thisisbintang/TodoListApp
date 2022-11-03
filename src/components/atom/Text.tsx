import React from 'react'
import { Text as RNText, TextProps } from 'react-native';

const Text: React.FunctionComponent<TextProps> = (props) => {
    const { style, ...rest } = props;
    return <RNText style={[style, {fontFamily: 'Poppins'}]} {...rest} />
}

export default Text;