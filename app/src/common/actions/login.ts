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

/** Tries to log in on the server. */
export function login(password: string) {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestLogin());
        const response = await api.login(password);
        try {
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
