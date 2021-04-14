import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'


function App() {
    const [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true}, //t
        {id: v1(), title: 'JS', isDone: true}, //t
        {id: v1(), title: 'React', isDone: false}, //t
        {id: v1(), title: 'Redux', isDone: false}, //t
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTasks(id: string) {
        const filteredTasks = tasks.filter(t => t.id !== id) //фильтр, пропусти те таски, id-шки которых не равны удаленной id-шке
        setTasks(filteredTasks) //setTasks - функция, которая меняет данные и вызывается после логической обработки; в параметрах - отфильтрованный массив
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodolist = tasks
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }

    function addTask(title: string) {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    )
}

export default App
