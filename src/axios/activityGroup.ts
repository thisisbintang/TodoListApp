import axios from 'axios';
import { ActivityGroupsResponse } from './type';

export const listActivityGroups = async () => {
    const response = await axios.get<ActivityGroupsResponse>('/activity-groups?email=yoga%2B1%40skyshi.io');
    return response.data;
}

export const removeActivityGroupsById = async (id: number) => {
    const response = await axios.delete<ActivityGroupsResponse>(`/activity-groups/${id}`);
    return response.data;
}