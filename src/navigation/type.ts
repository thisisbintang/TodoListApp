import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityGroupsResponse } from '../axios/type';

export type RootStackParamList = {
    Dashboard: undefined;
    ItemList: ActivityGroupsResponse['data'][0];
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;