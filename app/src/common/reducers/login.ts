import {Action} from '../actions';
import {LoginAction, LoginState} from '../definitions/login';

export const defaultValue: LoginState = {isLoading: false, isConnected: false};

/** Reducer that handles the `login` store node. */
export function login(state: LoginState = defaultValue, action: LoginAction) {
    switch (action.type) {
        case Action.REQUEST_LOGIN:
            return {
                isLoading: true,
                isConnected: state.isConnected
            };
        case Action.RECEIVE_LOGIN:
            return {
                isLoading: false,
                isConnected: action.isConnected
            };
        case Action.FAILURE_LOGIN:
            return {
                isLoading: false,
                error: action.error,
                isConnected: false
            };
        case Action.CLEAR_ERROR_LOGIN:
            return {
                isLoading: false,
                isConnected: false
            };
        default:
            return state;
    }
}
