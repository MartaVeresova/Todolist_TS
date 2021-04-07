import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

function App() {

    const tasksToLearn = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]

    const tasksToBuy = [
        {id: 4, title: 'Milk', isDone: true},
        {id: 5, title: 'Beer', isDone: true},
        {id: 6, title: 'Water', isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasksToLearn}/>
            <Todolist title={'What to buy'} tasks={tasksToBuy}/>
        </div>
    );
}

export default App;
