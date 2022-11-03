import { FontAwesome, Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ButtonProps, View, ViewProps } from 'react-native';
import Checkbox from 'expo-checkbox';
import Animated, { FadeOut, Layout } from 'react-native-reanimated';

import COLORS from '../../constans/colors';
import Text from '../atom/Text';
import { TTodoItem } from '../../screens/ItemList';
import { TodoItemsResponse } from '../../axios/type';

type TodoItemProps = TodoItemsResponse['data'][0] & Animated.AnimateProps<ViewProps> & Pick<ButtonProps, 'onPress'>;

export const getColorPriority = (priority: TTodoItem['priority'] | string) => {
    switch (priority) {
        case 'very-high': return COLORS.LIGHT.RED;
        case 'high': return COLORS.LIGHT.YELLOW;
        case 'normal': return COLORS.LIGHT.GREEN;
        case 'low': return COLORS.LIGHT.BLUE;
        case 'very-low': return COLORS.LIGHT.PURPLE;
    }
}

const TodoItem: React.FunctionComponent<TodoItemProps> = (props) => {
    const { title, priority, style, onPress, entering, ...rest } = props;
    const [isChecked, setChecked] = useState(false);

    return (
        <Animated.View
            entering={entering}
            exiting={FadeOut}
            layout={Layout.delay(100)}
            style={[style, {
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 56,
                backgroundColor: COLORS.LIGHT.WHITE,
                elevation: 7,
                borderRadius: 12,
                alignItems: 'center',
                paddingHorizontal: 20,
            }]}
            {...rest}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <Checkbox
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? COLORS.LIGHT.PRIMARY : undefined}
                    style={{
                        width: 12,
                        aspectRatio: 1,
                        marginRight: 14,
                    }}
                />
                <View
                    accessibilityLabel='todo-item-priority-indicator'
                    style={{
                        width: 5,
                        aspectRatio: 1,
                        borderRadius: 5 / 2,
                        backgroundColor: getColorPriority(priority),
                        marginRight: 14
                    }}
                />
                <Text
                    accessibilityLabel='todo-item-title'
                    style={{
                        fontSize: 14,
                        fontWeight: '600',
                        lineHeight: 21,
                        marginRight: 8,
                    }}
                >{title}</Text>
                <Octicons.Button
                    accessibilityLabel='todo-item-edit-button'
                    iconStyle={{
                        marginRight: 0
                    }}
                    backgroundColor='transparent'
                    name='pencil'
                    size={12}
                    color={COLORS.LIGHT.GRAY}
                />
            </View>
            <FontAwesome.Button
                accessibilityLabel='todo-item-delete-button'
                onPress={onPress}
                name='trash-o'
                color={COLORS.LIGHT.GRAY}
                underlayColor='transparent'
                size={16}
                backgroundColor={COLORS.LIGHT.WHITE}
            />
        </Animated.View>
    )
}

export default TodoItem