import React, {useEffect, useState} from 'react'
import {todoListApi} from '../api/todolist-api';


export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodos()
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'REDUX'
        todoListApi.createTodo(title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '5b4b8219-7db7-4aae-be3c-d68555bfd73c'
        todoListApi.deleteTodo(todoListId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '5b4b8219-7db7-4aae-be3c-d68555bfd73c'
        const title = 'REDUX'
        todoListApi.updateTodoTitle(todoListId, title)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = '23e36f5d-a98d-402b-bd15-1d64098628d6'
        todoListApi.getTasks(todoListId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTask = () => {
        todoListApi.createTask(todoListId, taskTitle)
            .then(res => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'task title'} value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const deleteTask = () => {
        todoListApi.deleteTask(todoListId, taskId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'todoListId'} value={todoListId} onChange={e => setTodoListId(e.currentTarget.value)}/>
            <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '8c847108-97ac-474a-8403-722651396fb2'
        const taskId = '950991d0-9573-41a9-9e3d-ae93f0a3f594'
        const model = {
            title: 'hey',
            description: '',
            status: 0,
            priority: 1,
            startDate: '',
            deadline: '',
        }

        todoListApi.updateTask(todolistId, taskId, model)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

