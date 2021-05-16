import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TasksPropsType>
}

function App() {
    //BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true}, //t
            {id: v1(), title: 'JS', isDone: true}, //t
            {id: v1(), title: 'React', isDone: false}, //t
            {id: v1(), title: 'Redux', isDone: false}, //t
        ],
        [todoListID2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true}, //t
            {id: v1(), title: 'JS', isDone: true}, //t
            {id: v1(), title: 'React', isDone: false}, //t
            {id: v1(), title: 'Redux', isDone: false}, //t
        ],
    })

    function removeTasks(id: string, todoListId: string) {
        //фильтр, пропусти те таски, id-шки которых не равны удаленной id-шке
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== id)}) //setTasks - функция, которая меняет данные и вызывается после логической обработки; в параметрах - отфильтрованный массив
    }
    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    function addTask(title: string, todoListId: string) {
        const newTask: TasksPropsType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    function addNewTodolist(title: string) {
        const newTodolistId = v1()
        const newTodolist: TodoListsType = {
            id: newTodolistId,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    function changeTaskStatus(taskId: string, newIsDoneChecked: boolean, todoListId: string) {
        let task = tasks[todoListId].find(t => t.id === taskId)
        task && (task.isDone = newIsDoneChecked)
        setTasks({...tasks})
    }
    function changeTaskTitle(taskID: string, newTitle: string, todolistID: string) {
        tasks[todolistID] = tasks[todolistID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        setTasks({...tasks})
    }

    function changeTodoListTitle(newTitle: string, todoListId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === todoListId ? {...t, title: newTitle} : t)})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    //UI:
    function getTasksForTodolist(todoList: TodoListsType) {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponent = todoLists.map(tl => {
            return <Todolist
                key={tl.id}
                todoListId={tl.id}
                title={tl.title}
                tasks={getTasksForTodolist(tl)}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        }
    )
    return (
        //JSX
        <div className="App">
            <AddItemForm addItem={addNewTodolist}/>
            {todoListComponent}
        </div>
    )
}

export default App
