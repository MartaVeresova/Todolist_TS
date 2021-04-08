import React, {useState} from 'react';
import './App.css';
import {TasksPropsType, Todolist} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TasksPropsType>>([
        {id: 1, title: 'HTML&CSS', isDone: true}, //t
        {id: 2, title: 'JS', isDone: true}, //t
        {id: 3, title: 'React', isDone: false}, //t
        {id: 4, title: 'Redux', isDone: false}, //t
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')

    function removeTasks(id: number) {
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

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
