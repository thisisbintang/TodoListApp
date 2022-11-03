import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from './type';
import Dashboard from '../screens/Dashboard';
import COLORS from '../constans/colors';
import ItemList from '../screens/ItemList';
import { TouchableOpacity } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={({ navigation }) => ({
                    headerTintColor: COLORS.LIGHT.WHITE,
                    headerStyle: {
                        backgroundColor: COLORS.LIGHT.PRIMARY,
                    },
                    headerTitleStyle: {
                        fontFamily: 'Poppins',
                        fontSize: 18,
                        fontWeight: '700'
                    },
                    contentStyle: {
                        backgroundColor: COLORS.LIGHT.WHITE,
                        paddingHorizontal: 20,
                        paddingVertical: 34 
                    },
                    headerLeft: props => props.canGoBack && <Ionicons.Button
                        name='chevron-back-outline'
                        size={21}
                        color={COLORS.LIGHT.WHITE}
                        onPress={() => { navigation.goBack() }}
                        underlayColor='transparent'
                        activeOpacity={0.7}
                        backgroundColor='transparent'

                    />


                })}
            >
                <Stack.Screen
                    name='Dashboard'
                    options={{
                        title: 'TO DO LIST APP',
                    }}
                    component={Dashboard} />
                <Stack.Screen
                    name='ItemList'
                    options={{
                        title: 'New Activity'
                    }}
                    component={ItemList}
                />
            </Stack.Navigator>
        </NavigationContainer >)
}

export default RootStack;