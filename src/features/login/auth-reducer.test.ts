import {authReducer, InitialStateType, setIsLoggedInAC} from '../login/auth-reducer'

let startState: InitialStateType;
beforeEach(() => {
    startState = {isLoggedIn: false}
})


test('is logged in should be set', () => {
    const action = setIsLoggedInAC(true);

    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true);
});