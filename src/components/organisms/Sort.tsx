import React, { useState } from 'react'
import { FlatList, FlatListProps, Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import COLORS from '../../constans/colors';
import SortSelection from '../molecules/SortSelection';

interface TSortSelectionItem {
    id: string;
    content: string;
    icon: ImageSourcePropType;
}

const SORTSELECTIONDATA: TSortSelectionItem[] = [
    { id: '1', content: 'Terbaru', icon: require('../../../assets/icons/sort-selection-icon.png') },
    { id: '2', content: 'Terlama', icon: require('../../../assets/icons/sort-up-selection-icon.png') },
    { id: '3', content: 'A - Z', icon: require('../../../assets/icons/sort-az-selection-icon.png') },
    { id: '4', content: 'Z - A', icon: require('../../../assets/icons/sort-za-selection-icon.png') },
    { id: '5', content: 'Belum Selesai', icon: require('../../../assets/icons/sort-up-down-selection-icon.png') },
]

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<TSortSelectionItem>);

type SortProps = Pick<FlatListProps<TSortSelectionItem>, 'style' | 'accessibilityLabel'>;

const Sort: React.FunctionComponent<SortProps> = (props) => {
    const { style, ...rest } = props;
    const [sortSelectionData, setSortSelectionData] = useState(SORTSELECTIONDATA);

    return (
        <AnimatedFlatList
            {...rest}
            ItemSeparatorComponent={props => <View
                style={{
                    borderWidth: 0.2,
                    borderColor: COLORS.LIGHT.GRAY
                }}
            />}
            style={[style]}
            contentContainerStyle={{
                borderRadius: 6,
                width: 167,
                backgroundColor: COLORS.LIGHT.WHITE,
            }}
            data={sortSelectionData}
            renderItem={({ item }) => (
                <SortSelection
                    accessibilityLabel='sort-selection'
                    Icon={<Image
                        accessibilityLabel='sort-selection-icon'
                        style={{
                            width: 14.33,
                            aspectRatio: 1,
                            marginRight: 11.94
                        }}
                        source={item.icon} />}
                    content={item.content} />
            )}
        />
    )
}

export default Sort