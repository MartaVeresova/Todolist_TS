import {
    addNewTaskAC,
    changeTaskAC,
    changeTaskEntityStatusAC,
    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../../app/App';
import {addNewTodoListAC, removeTodoListAC, setTodoListsAC} from './todoLists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolist-api';

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                todoListId: 'todoListId1',
                title: 'CSS',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '2',
                todoListId: 'todoListId1',
                title: 'JS',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '3',
                todoListId: 'todoListId1',
                title: 'React',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            }
        ],
        'todolistId2': [
            {
                id: '1',
                todoListId: 'todoListId2',
                title: 'bread',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '2',
                todoListId: 'todoListId2',
                title: 'milk',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '3',
                todoListId: 'todoListId2',
                title: 'tea',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            }
        ]
    }
})

test('tasks should be added for todoList', () => {
    const action = setTasksAC('todolistId1', startState['todolistId1']);

    const endState = tasksReducer({'todolistId2': [], 'todolistId1': []}, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toStrictEqual(0);

});

test('correct task should be deleted from correct array', () => {
    const action = setTodoListsAC([
        {id: '1', title: 'What to learn', addedDate: '', order: 0},
        {id: '2', title: 'What to buy', addedDate: '', order: 0}
    ]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);

});

test('empty arrays should be added, when we set todoLists', () => {
    const action = removeTaskAC('2', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                id: '1',
                todoListId: 'todoListId1',
                title: 'CSS',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '2',
                todoListId: 'todoListId1',
                title: 'JS',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '3',
                todoListId: 'todoListId1',
                title: 'React',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            }
        ],
        'todolistId2': [
            {
                id: '1',
                todoListId: 'todoListId2',
                title: 'bread',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            },
            {
                id: '3',
                todoListId: 'todoListId2',
                title: 'tea',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
                entityStatus: 'idle',
            }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const action = addNewTaskAC({
        id: '4',
        todoListId: 'todolistId2',
        title: 'juce',
        description: '',
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
    });

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBe('4');
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const action = changeTaskAC('2', {status: TaskStatuses.New}, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = changeTaskAC('2', {title: 'beer'}, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('beer');
    expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new array should be added when new todolist is added', () => {
    const action = addNewTodoListAC({
        id: 'todolistId3',
        title: 'REDUX',
        order: 0,
        addedDate: '',
    });

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC('todolistId2');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).toBeUndefined();
});

test('correct entity status of task should be changed', () => {
    const action = changeTaskEntityStatusAC('loading', 'todolistId2', '1');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].entityStatus).toBe('loading');
    expect(endState['todolistId1'][0].entityStatus).toBe('idle');
});