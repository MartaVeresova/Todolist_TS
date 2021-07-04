import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addNewTodoListAC, removeTodoListAC} from './todoLists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                taskId: '1',
                todoListId: 'todoListId1',
                title: 'CSS',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '2',
                todoListId: 'todoListId1',
                title: 'JS',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '3',
                todoListId: 'todoListId1',
                title: 'React',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            }
        ],
        'todolistId2': [
            {
                taskId: '1',
                todoListId: 'todoListId2',
                title: 'bread',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '2',
                todoListId: 'todoListId2',
                title: 'milk',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '3',
                todoListId: 'todoListId2',
                title: 'tea',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {
                taskId: '1',
                todoListId: 'todoListId1',
                title: 'CSS',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '2',
                todoListId: 'todoListId1',
                title: 'JS',
                description: '',
                order: 0,
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '3',
                todoListId: 'todoListId1',
                title: 'React',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            }
        ],
        'todolistId2': [
            {
                taskId: '1',
                todoListId: 'todoListId2',
                title: 'bread',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            },
            {
                taskId: '3',
                todoListId: 'todoListId2',
                title: 'tea',
                description: '',
                order: 0,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '',
            }
        ]
    });

});

test('correct task should be added to correct array', () => {
    const action = addNewTaskAC('juce', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].taskId).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC('2', 'beer', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('beer');
    expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new array should be added when new todolist is added', () => {
    const action = addNewTodoListAC('new todolist');

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
