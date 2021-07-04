import {TasksStateType} from '../App';
import {addNewTodoListAC, TodoListDomainType, todoListsReducer} from './todoLists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = addNewTodoListAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    // {'xxx': []}
    // [{id: 'xxx', title: 'new todolist', filter: 'all'}]

    const keys = Object.keys(endTasksState); //['xxx']
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodoLists).toBe(action.todoListId);
});
