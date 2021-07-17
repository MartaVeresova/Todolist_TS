import {appReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from './app-reducer';


test('app status should be changed', () => {
    const startState = {status: 'idle' as RequestStatusType, error: null as string | null}
    const action = setAppStatusAC('succeeded');

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('succeeded');
    expect(endState.status).not.toBe('idle');
});

test('app error should be changed', () => {
    const startState = {status: 'idle' as RequestStatusType, error: null as string | null}
    const action = setAppErrorAC('ERROR');

    const endState = appReducer(startState, action)

    expect(endState.error).toBe('ERROR');
    expect(endState.error).not.toBe(null);
});
