import { FontAwesome5, Octicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ImageSourcePropType } from 'react-native';
import { StyleSheet, View, Image, TouchableOpacity, Platform } from 'react-native';
import { FadeIn, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Button from '../components/atom/ButtonIcon';

import Text from '../components/atom/Text';
import SortSelection from '../components/molecules/SortSelection';
import TodoItem from '../components/molecules/TodoItem';
import Sort from '../components/organisms/Sort';
import COLORS from '../constans/colors';

import { RootStackScreenProps } from '../navigation/type';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import AddListItem from '../components/organisms/AddListItem';
import DeleteActivity from '../components/organisms/DeleteActivity';
import { deleteTodoItemsById, listTodoItemsByActivityGroupId } from '../axios/todoItems';

type ItemListProps = RootStackScreenProps<'ItemList'>;

export type Priority = 'very-high' | 'high' | 'normal' | 'low' | 'very-low';

export interface TTodoItem {
    id: string;
    content: string;
    priority: Priority
}

const ItemList: React.FunctionComponent<ItemListProps> = (props) => {
    const { navigation, route } = props;
    const [isVisible, setVisible] = useState(true);
    const initialItemMode = useRef(true);
    const headerHight = useHeaderHeight();
    const [modalAddItem, setModalAddItem] = useState(false)
    const [modalSort, setModalSort] = useState(false)

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['todo-items', 'list'],
        queryFn: () => listTodoItemsByActivityGroupId(route.params.id)
    })

    const deleteMutation = useMutation({
        mutationFn: deleteTodoItemsById,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['todo-items', 'list']
            })
        }
    })

    const handleRemoveItem = useCallback((itemId: number) => {
        deleteMutation.mutate(itemId)
    }, []);

    useLayoutEffect(() => {
        initialItemMode.current = false;
    }, []);

    const toggleModalAddItem = () => {
        setModalAddItem(!modalAddItem);
    }

    const toggleModalSort = () => {
        setModalSort(!modalSort);
    }

    return (
        <SafeAreaView
            style={{
                marginTop: headerHight,
                flex: 1,
            }}>
            <Modal
                isVisible={modalAddItem}
                onBackdropPress={toggleModalAddItem}
            >
                <AddListItem
                    style={{
                        alignSelf: 'center'
                    }}
                    onClose={toggleModalAddItem}
                    activityGroupId={route.params.id}
                    toggleModalAddItem={toggleModalAddItem}
                />
            </Modal>
            <Modal
                isVisible={modalSort}
                style={{
                    justifyContent: 'center'
                }}
                onBackdropPress={toggleModalSort}
            >
                <Sort
                    style={{
                        alignSelf: 'center'
                    }}
                />
            </Modal>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}>
                <Text
                    accessibilityLabel='activity-title'
                    style={{
                        fontSize: 16,
                        lineHeight: 24,
                        fontWeight: '600',
                        color: COLORS.LIGHT.BLACK
                    }}
                >{route.params.title}</Text>
                <Octicons.Button
                    accessibilityLabel='todo-title-edit-button'
                    iconStyle={{
                        marginRight: 0
                    }}
                    backgroundColor='transparent'
                    name='pencil'
                    size={20}
                    color={COLORS.LIGHT.GRAY} />
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    marginTop: 24,
                    marginBottom: 28,
                }}>
                {
                    (
                        <View
                            accessibilityLabel='todo-sort-button'
                            onTouchStart={toggleModalSort}
                            style={{
                                width: 38,
                                aspectRatio: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 19,
                                borderWidth: StyleSheet.hairlineWidth,
                                marginRight: 8,
                            }}>
                            <Image
                                source={require('../../assets/icons/sort.png')} />
                        </View>
                    )
                }
                <Button
                    accessibilityLabel='activity-add-button'
                    Icon={<FontAwesome5
                        name='plus'
                        size={12}
                        color={COLORS.LIGHT.WHITE} />}
                    text='Tambah'
                    onPress={toggleModalAddItem}
                />
            </View>
            {/* <Sort /> */}
            {
                query.data?.data.length ? query.data.data.map((todoItem, index) => (
                    <TodoItem
                        accessibilityLabel='todo-item'
                        key={todoItem.id}
                        style={{
                            marginBottom: 8
                        }}
                        entering={initialItemMode ? FadeIn.delay(100 * index) : FadeIn}
                        onPress={() => handleRemoveItem(todoItem.id)}
                        {...todoItem} />
                )) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            accessibilityLabel='todo-empty-state'
                            source={require('../../assets/images/todo-empty-state.png')} />
                        <Text
                            style={{
                                marginTop: 35,
                                fontSize: 16,
                                lineHeight: 24,
                                fontWeight: '600'
                            }}>Buat activity pertamamu</Text>
                    </View>
                )
            }

        </SafeAreaView>
    )
}

export default ItemList