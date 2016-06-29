import {Action} from './';
import {Api} from '../server';
import {LoginAction} from '../definitions/login';

/** Action creator called on load request. */
function requestLogin(): LoginAction {
    return {
        type: Action.REQUEST_LOGIN
    };
}

/** Action creator called on successful request. */
function receiveLogin({connected, userName}: {connected: boolean, userName?: string}): LoginAction {
    return {
        type: Action.RECEIVE_LOGIN,
        isConnected: connected,
        userName
    };
}

/** Action creator called on failed request. */
function failureLogin(error: string): LoginAction {
    return {
        type: Action.FAILURE_LOGIN,
        error
    };
}

/** Logs in on the server. */
export function login(password: string) {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestLogin());
        try {
            await api.login(password);
            dispatch(receiveLogin({connected: true}));
        } catch (e) {
            dispatch(failureLogin(e.message));
        }
    };
}

/** Logs out of the server. */
export function logout() {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestLogin());
        try {
            await api.login('yolo');
        } catch (e) {
            // We ignore errors.
        }
        dispatch(receiveLogin({connected: false}));
    };
}

/** Queries the server to know if the user is connected. */
export function isConnected() {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestLogin());
        try {
            dispatch(receiveLogin(await api.isConnected()));
        } catch (e) {
            dispatch(failureLogin(e.message));
        }
    };
}

/** Clear the login error. */
export function clearError(): LoginAction {
    return {type: Action.CLEAR_ERROR_LOGIN};
}
