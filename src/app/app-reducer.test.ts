import {
    appReducer,
    InitialStateType,
    RequestStatusType,
    setAppErrorAC,
    setAppStatusAC,
    setIsInitializedAC
} from './app-reducer';

let startState: InitialStateType;
beforeEach(() => {
    startState = {status: 'idle', error: null, isInitialized: false}
})


test('app status should be set', () => {
    const action = setAppStatusAC('succeeded');

    const endState = appReducer(startState, action)

    expect(endState.status).toBe('succeeded');
    expect(endState.status).not.toBe('idle');
});

test('app error should be set', () => {
    const action = setAppErrorAC('ERROR');

    const endState = appReducer(startState, action)

    expect(endState.error).toBe('ERROR');
    expect(endState.error).not.toBe(null);
});

test('initialized should be set', () => {
    const startState = {status: 'idle' as RequestStatusType, error: null as string | null, isInitialized: false}
    const action = setIsInitializedAC(true);

    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBe(true);
});