import {Action} from '../actions';

/** State spec for the `login` store node. */
export interface LoginState {
    isLoading: boolean;
    isConnected: boolean;
    error?: string;
    userName?: string;
}

/** Action spec for the `login` store node. */
export interface LoginAction {
    type: Action;
    isConnected?: boolean;
    error?: string;
    userName?: string;
}