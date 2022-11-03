import React, { useState } from 'react'
import { StyleProp, StyleSheet, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import DropdDownPicker, { ItemType } from 'react-native-dropdown-picker'
import { useMutation, useQueryClient } from '@tanstack/react-query';

import COLORS from '../../constans/colors'
import Text from '../atom/Text'
import TextInput from '../atom/TextInput'
import { getColorPriority } from '../molecules/TodoItem'
import { createTodoItems } from '../../axios/todoItems';
import ButtonText from '../atom/ButtonText';

interface AddListItemProps {
    activityGroupId: number;
    onClose?: TouchableOpacityProps['onPress'];
    style?: StyleProp<ViewStyle>;
    toggleModalAddItem: () => void;
}

const AddListItem: React.FunctionComponent<AddListItemProps> = (props) => {
    const { activityGroupId, onClose, toggleModalAddItem, style } = props;
    const [title, setTitle] = useState()
    const [openPriority, setOpenPriority] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [priorityItems, setPriorityItems] = useState<ItemType<string>[]>([
        {
            label: 'Very High', value: 'very-high', icon: () => (
                <View
                    style={{
                        width: 14,
                        aspectRatio: 1,
                        borderRadius: 14 / 2,
                        backgroundColor: getColorPriority('very-high'),
                        marginRight: 14,
                    }}
                />
            )
        },
        {
            label: 'High', value: 'high', icon: () => (
                <View
                    style={{
                        width: 14,
                        aspectRatio: 1,
                        borderRadius: 14 / 2,
                        backgroundColor: getColorPriority('high'),
                        marginRight: 14,
                    }}
                />
            )
        },
        {
            label: 'Medium', value: 'normal', icon: () => (
                <View
                    style={{
                        width: 14,
                        aspectRatio: 1,
                        borderRadius: 14 / 2,
                        backgroundColor: getColorPriority('normal'),
                        marginRight: 14,
                    }}
                />
            )
        },
        {
            label: 'Low', value: 'low', icon: () => (
                <View
                    style={{
                        width: 14,
                        aspectRatio: 1,
                        borderRadius: 14 / 2,
                        backgroundColor: getColorPriority('low'),
                        marginRight: 14,
                    }}
                />
            )
        },
        {
            label: 'Very Low', value: 'very-low', icon: () => (
                <View
                    style={{
                        width: 14,
                        aspectRatio: 1,
                        borderRadius: 14 / 2,
                        backgroundColor: getColorPriority('very-low'),
                        marginRight: 14,
                    }}
                />
            )
        },
    ])

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createTodoItems,
        onSuccess: () => {
            toggleModalAddItem();
            queryClient.invalidateQueries({
                queryKey: ['todo-items', 'list']
            })
        }
    })

    const createItem = () => {
        title && title !== '' && selectedPriority && createMutation.mutate({
            activity_group_id: activityGroupId,
            priority: selectedPriority,
            title,
        })
    }


    return (
        <View
            style={[{
                width: 320,
                height: 382,
                borderRadius: 12,
                backgroundColor: COLORS.LIGHT.WHITE,
                elevation: 8,
            }, style]}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 22,
                    paddingTop: 19,
                    paddingVertical: 17,
                    borderBottomWidth: StyleSheet.hairlineWidth
                }}
            >
                <Text
                    accessibilityLabel='modal-add-title'
                    style={{
                        fontWeight: '600',
                        fontSize: 16,
                        lineHeight: 24,
                        color: COLORS.LIGHT.BLACK
                    }}
                >
                    Tambah List Item
                </Text>
                <Ionicons.Button
                    accessibilityLabel='modal-add-close-button'
                    name='close'
                    iconStyle={{
                        marginRight: 0,
                    }}
                    backgroundColor='transparent'
                    color={COLORS.LIGHT.GRAY1}
                    underlayColor='transparent'
                    onPress={onClose}
                />
            </View>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 22,
                    paddingTop: 23,
                    paddingBottom: 18,
                    // backgroundColor: 'yellow'
                }}
            >
                <Text
                    accessibilityLabel='modal-add-name-title'
                    style={{
                        fontWeight: '600',
                        fontSize: 10,
                        lineHeight: 15,
                    }}
                >
                    NAMA LIST ITEM
                </Text>
                <TextInput
                    accessibilityLabel='model-add-name-input'
                    style={{
                        marginTop: 12,
                    }}
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Tambahkan nama list item'
                />
                <Text
                    accessibilityLabel='modal-add-priority-title'
                    style={{
                        fontWeight: '600',
                        fontSize: 10,
                        lineHeight: 15,
                        marginTop: 23,
                    }}
                >
                    PRIORITY
                </Text>
                <DropdDownPicker
                    props={{
                        accessibilityLabel: 'modal-add-priority-dropdown',
                    }}
                    open={openPriority}
                    value={selectedPriority}
                    items={priorityItems}
                    setOpen={setOpenPriority}
                    setValue={setSelectedPriority}
                    setItems={setPriorityItems}
                    itemSeparator={true}
                    itemProps={{
                        style: {
                            flexDirection: 'row',
                            paddingHorizontal: 17,
                            paddingTop: 17,
                            paddingBottom: 14,
                            alignItems: 'center'
                        }
                    }}
                    listItemLabelStyle={{
                        fontFamily: 'Poppins'
                    }}
                    labelStyle={{
                        fontFamily: 'Poppins'
                    }}
                    placeholder='Pilih priority'
                    containerStyle={{
                        borderRadius: 6,
                        marginTop: 12,
                    }}
                    zIndex={10}
                />
                <ButtonText
                    accessibilityLabel='modal-add-save-button'
                    text='Simpan'
                    style={{
                        position: 'absolute',
                        right: 27,
                        bottom: 18,
                    }}
                    onPress={createItem}
                />
            </View>
        </View>
    )
}

export default AddListItem