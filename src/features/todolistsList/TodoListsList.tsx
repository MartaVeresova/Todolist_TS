import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    InitialTodoListsStateType,
    removeTodoListTC
} from './todoLists-reducer';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {AddItemForm} from '../../components/addItemForm/AddItemForm';
import {TodoList} from './todolist/Todolist';



export const TodoListsList: React.FC = () => {
    //BLL
    const todoLists = useSelector<AppRootStateType, InitialTodoListsStateType>(state => state.todoLists)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    function removeTodolist(todoListId: string) {
        dispatch(removeTodoListTC(todoListId))
    }

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    function changeTodoListTitle(title: string, todoListId: string) {
        dispatch(changeTodoListTitleTC(todoListId, title))
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(changeTodoListFilterAC(value, todoListId))
    }

    return <>
        <Grid container style={{padding: '20px 0'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map(tl => {
                    return (
                        <Grid item key={tl.id}>
                            <Paper elevation={4} style={{padding: '15px'}}>
                                <TodoList
                                    todoListId={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    entityStatus={tl.entityStatus}
                                    changeFilter={changeFilter}
                                    removeTodolist={removeTodolist}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>
}