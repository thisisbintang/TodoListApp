import React, { ReactElement } from 'react';
import { View, ViewProps } from 'react-native';
import Text from '../atom/Text';

interface SortSelectionProps extends ViewProps {
    content: string;
    Icon: ReactElement;
}

const SortSelection: React.FunctionComponent<SortSelectionProps> = (props) => {
    const { content, Icon, ...rest } = props;

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 13.53,
                paddingHorizontal: 16.72,
            }}
            {...rest}
        >
            {Icon}
            <Text
                accessibilityLabel='sort-selection-title'
                style={{
                    fontWeight: '400',
                    fontSize: 14,
                    lineHeight: 21,
                }}
            >{content}</Text>
        </View>
    )
}

export default SortSelection