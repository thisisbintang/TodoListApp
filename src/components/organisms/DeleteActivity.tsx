import React from 'react'
import { View, Image, TouchableOpacityProps, ViewProps } from 'react-native'
import COLORS from '../../constans/colors'
import ButtonText from '../atom/ButtonText'
import Text from '../atom/Text'

interface DeleteActivityProps extends ViewProps {
    title: string;
    onCancel?: TouchableOpacityProps['onPress'];
    onSave?: TouchableOpacityProps['onPress'];
}

const DeleteActivity: React.FunctionComponent<DeleteActivityProps> = (props) => {
    const { title = "unkown", onCancel, onSave, style } = props;

    return (
        <View
            style={[{
                width: 320,
                height: 300,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 12,
                backgroundColor: COLORS.LIGHT.WHITE,
                elevation: 4
            }, style]}
        >
            <Image
                accessibilityLabel='modal-delete-line'
                source={require('../../../assets/icons/modal-delete-icon.png')}
            />
            <Text
                accessibilityLabel='modal-delete-title'
                style={{
                    marginTop: 41.92,
                    width: 244,
                    textAlign: 'center',
                    fontWeight: '500',
                    fontSize: 14,
                    lineHeight: 21
                }}
            >
                Apakah anda yakin menghapus activity{" "}
                <Text
                    style={{
                        fontWeight: '700'
                    }}
                >
                    {`"${title}"?`}
                </Text>
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 36,
                    marginTop: 43,
                }}
            >
                <ButtonText
                    accessibilityLabel='modal-add-cancel-button'
                    text='Batal'
                    style={{
                        backgroundColor: COLORS.LIGHT.GRAY2,
                        width: 117,
                    }}
                    textStyle={{
                        color: COLORS.LIGHT.BLACK1
                    }}
                    onPress={onCancel}
                />
                <ButtonText
                    accessibilityLabel='modal-add-save-button'
                    text='Hapus'
                    style={{
                        backgroundColor: COLORS.LIGHT.RED,
                        width: 117,
                    }}
                    onPress={onSave}
                />
            </View>
        </View>
    )
}

export default DeleteActivity