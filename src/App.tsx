import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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
    const todoListID1 = v1()
    const todoListID2 = v1()

    //BLL:
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

    function addTask(title: string, todoListId: string) {
        const newTask: TasksPropsType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    function changeTaskStatus(taskId: string, newIsDoneChecked: boolean, todoListId: string) {
        let task = tasks[todoListId].find(t => t.id === taskId)
        task && (task.isDone = newIsDoneChecked)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: value} : tl))
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListsType = {
            id: newTodoListID,
            title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    function changeTodoListTitle(title: string, todoListId: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
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

    function removeTodolist(todoListId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const todoListComponent = todoLists.map(tl =>
        <Grid item key={tl.id}>
            <Paper elevation={4} style={{padding: '15px'}}>
                <Todolist
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={getTasksForTodolist(tl)}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
        </Grid>
    )
    return (
        //JSX
        <div>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        TodoLists
                    </Typography>
                    <Button
                        color={'inherit'}
                        variant={'outlined'}
                    >
                        LogIn
                    </Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListComponent}
                </Grid>
            </Container>
        </div>
    )
}

export default App
