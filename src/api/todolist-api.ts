import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': '56cc9d09-6ac5-48a7-98d1-6f7ea21ef704',
    },
})

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CommonResponseType<T = {}> = {
    resultCode: 0 | 1 | 10
    fieldsErrors: string[]
    messages: string[]
    data: T
}


export const todoListApi = {
    getTodo() {
        return instance.get<TodoType[]>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
      return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },

}