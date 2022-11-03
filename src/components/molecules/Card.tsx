import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import COLORS from '../../constans/colors';
import Text from '../atom/Text';
import DeleteActivity from '../organisms/DeleteActivity';
import { ActivityGroupsResponse } from '../../axios/type';
import { removeActivityGroupsById } from '../../axios/activityGroup';

type CardProps = TouchableOpacityProps & ActivityGroupsResponse['data'][0];

const Card: React.FunctionComponent<CardProps> = (props) => {
    const { title, created_at, id, style, ...rest } = props;
    const [deleteModal, setDeleteModal] = useState(false)

    const queryClient = useQueryClient();

    const removeMutation = useMutation({
        mutationFn: removeActivityGroupsById,
        onSuccess: () => {
            toggleDeleteModal();
            queryClient.invalidateQueries({
                queryKey: ['activity_groups', 'list']
            })
        }
    });

    const handleRemoveActivityGroup = () => {
        removeMutation.mutate(id);
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
    }

    return (
        <>
            <TouchableOpacity
                style={[style, {
                    width: 150,
                    height: 150,
                    borderRadius: 12,
                    elevation: 5,
                    paddingVertical: 13,
                    paddingHorizontal: 17,
                    backgroundColor: COLORS.LIGHT.WHITE,
                    justifyContent: 'space-between'
                }]}
                {...rest}>
                <Text
                    accessibilityLabel='activity-item-title'
                    style={{
                        fontWeight: '700',
                        fontSize: 14,
                        lineHeight: 21,
                    }}>{title}</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    <Text
                        accessibilityLabel='activity-item-date'
                        style={{
                            fontSize: 10,
                            lineHeight: 15,
                            fontWeight: '500',
                            marginBottom: 4,
                        }}>
                        {moment(created_at).format('LL')}
                    </Text>
                    <FontAwesome.Button
                        accessibilityLabel='activity-item-delete-button'
                        iconStyle={{
                            marginRight: 0
                        }}
                        backgroundColor='transparent'
                        underlayColor='transparent'
                        name='trash-o'
                        color={COLORS.LIGHT.GRAY}
                        size={12}
                        onPress={toggleDeleteModal}
                    />
                </View>
            </TouchableOpacity>
            <Modal
                isVisible={deleteModal}
                onBackdropPress={toggleDeleteModal}
            >
                <DeleteActivity
                    style={{
                        alignSelf: 'center'
                    }}
                    onCancel={toggleDeleteModal}
                    onSave={() => handleRemoveActivityGroup()}
                    title={title}
                />
            </Modal>
        </>
    )
}

export default Card