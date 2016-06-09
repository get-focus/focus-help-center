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
function receiveLogin(isConnected: boolean): LoginAction {
    return {
        type: Action.RECEIVE_LOGIN,
        isConnected
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
            const response = await api.login(password);
            if (response === true) {
                dispatch(receiveLogin(true));
            } else {
                dispatch(failureLogin(response as string));
            }
        } catch (err) {
            dispatch(failureLogin(err));
        }
    };
}

/** Logs out of the server. */
export function logout() {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestLogin());
        try {
            await api.login('yolo');
            dispatch(receiveLogin(false));
        } catch (err) {
            dispatch(failureLogin(err));
        }
    };
}

/** Queries the server to know if the user is connected. */
export function isConnected() {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestLogin());
        try {
            dispatch(receiveLogin(await api.isConnected()));
        } catch (err) {
            dispatch(failureLogin(err));
        }
    };
}

/** Clear the login error. */
export function clearError(): LoginAction {
    return {type: Action.CLEAR_ERROR_LOGIN};
}
