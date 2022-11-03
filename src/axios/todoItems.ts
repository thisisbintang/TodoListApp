import axios from 'axios';
import { TodoItemBody, TodoItemsResponse } from './type';

export const listTodoItemsByActivityGroupId = async (id: number) => {
    const response = await axios.get<TodoItemsResponse>(`/todo-items?activity_group_id=${id}`);
    return response.data;
}

export const createTodoItems = async (body: TodoItemBody) => {
    const response = await axios.post<TodoItemsResponse>(`/todo-items`, {
        ...body
    });
    return response.data;
}

export const deleteTodoItemsById = async (id: number) => {
    const response = await axios.delete<TodoItemsResponse>(`/todo-items/${id}`);
    return response.data;
}