import {v1} from 'uuid';
import {
    addNewTodoListAC, changeTodolistEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    FilterValuesType,
    removeTodoListAC,
    setTodoListsAC,
    TodoListDomainType,
    todoListsReducer
} from './todoLists-reducer';
import {RequestStatusType} from '../../app/app-reducer';

let todoListId1: string
let todoListId2: string
let startState: TodoListDomainType[] = []

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();
    startState = [
        {id: todoListId1, title: 'What to learn', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'},
        {id: todoListId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all', entityStatus: 'idle'}
    ]
})

test('todolist should be set the state', () => {
    const endState = todoListsReducer([], setTodoListsAC(startState))

    expect(endState.length).toBe(2);
});

test('correct todolist should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => {
    let newTodoListTitle = 'New Todolist';

    const endState = todoListsReducer(startState, addNewTodoListAC({
            id: 'todoListId3',
            title: newTodoListTitle,
            order: 0,
            addedDate: '',
        })
    )

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
});

test('correct todolist should change its name', () => {
    let newTodoListTitle = 'New TodoList';

    const endState = todoListsReducer(startState, changeTodoListTitleAC(newTodoListTitle, todoListId2));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const endState = todoListsReducer(startState, changeTodoListFilterAC(newFilter, todoListId2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const endState = todoListsReducer(startState, changeTodolistEntityStatusAC(newStatus, todoListId2));

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});



