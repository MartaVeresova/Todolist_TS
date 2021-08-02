import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': '56cc9d09-6ac5-48a7-98d1-6f7ea21ef704',
    },
})

//api
export const todoListApi = {
    getTodos() {
        return instance.get<TodoListType[]>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoListType }>>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post<CommonResponseType<{ userId?: number }>>(`/auth/login`, data)
    },
    me() {
        debugger
        return instance.get<CommonResponseType<AuthMeResponseType>>(`/auth/me`)
    },
    logout() {
        return instance.delete<CommonResponseType>(`/auth/login`)
    },
}

//types
export type CommonResponseType<T = {}> = {
    resultCode: 0 | 1 | 10
    fieldsErrors: string[]
    messages: string[]
    data: T
}
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export enum ResponseStatuses {
    succeeded = 0,
    error = 1,
    captcha = 10,
}

export type TaskType = {
    todoListId: string
    id: string
    title: string
    description: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
type TasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type AuthMeResponseType = {
    id: number
    login: string
    email: string
}