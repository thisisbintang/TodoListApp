import React, { useCallback } from 'react';
import { Image, View } from 'react-native';
import { RootStackScreenProps } from '../navigation/type';
import { FontAwesome5 } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';

import Text from '../components/atom/Text';
import Button from '../components/atom/ButtonIcon';
import COLORS from '../constans/colors';
import Card from '../components/molecules/Card';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHeaderHeight } from '@react-navigation/elements';
import { listActivityGroups } from '../axios/activityGroup';
import { ActivityGroupsResponse } from '../axios/type';

type DashboardProps = RootStackScreenProps<'Dashboard'>;

export interface Item {
    id: string;
    content: string;
    date: string;
}

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
    const { navigation } = props;
    const headerHight = useHeaderHeight();

    const handleNavigateToItemList = useCallback((activityGroup: ActivityGroupsResponse['data'][0]) => {
        navigation.navigate('ItemList', activityGroup);
    }, [navigation]);

    const query = useQuery({
        queryKey: ['activity_groups', 'list'],
        queryFn: listActivityGroups
    });

    return (
        <SafeAreaView
            style={{
                marginTop: headerHight,
            }}>
            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                    accessibilityLabel='activity-title'
                    style={{ fontSize: 16, lineHeight: 24, fontWeight: '700' }}>Activity</Text>
                <Button
                    accessibilityLabel='activity-add-button'
                    Icon={<FontAwesome5
                        name='plus'
                        size={12}
                        color={COLORS.LIGHT.WHITE} />}
                    text='Tambah' />
            </View>
            {
                query.data ?
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            marginTop: 37,
                        }}>
                        {
                            query.data.data.map(item => (
                                <Card
                                    accessibilityLabel='activity-item'
                                    key={item.id}
                                    onPress={() => handleNavigateToItemList(item)}
                                    style={{
                                        marginBottom: 20
                                    }}
                                    {...item}
                                />
                            ))
                        }
                    </View>

                    : (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                accessibilityLabel='activity-empty-state'
                                source={require('../../assets/images/activity-empty-state.png')} />
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

export default Dashboard