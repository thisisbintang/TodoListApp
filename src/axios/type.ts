import { Priority } from "../screens/ItemList";

export interface ActivityGroupsResponse {
    total: number
    limit: number
    skip: 0;
    data: {
        id: number;
        title: string;
        created_at: string;
    }[]
}

export interface TodoItemBody {
    activity_group_id: number
    title: string;
    priority: Priority | string;
    _comment?: string;
}

export interface TodoItemsResponse {
    total: number
    limit: number
    skip: 0;
    data: {
        id: number;
        title: string;
        created_at: string;
        activity_group_id: number;
        is_active: number;
        priority: string;
    }[]
}