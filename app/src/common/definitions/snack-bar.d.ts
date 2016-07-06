import {Action} from '../actions';

/** Spec for the snackbar object. */
export interface SnackbarData {
    message: string;
    actionText?: string;
    actionHandler?: () => void;
    isError: boolean;
}

/** Spec for the snackbar state object. */
export interface SnackbarState extends SnackbarData {
    show: boolean;
    message: string;
    actionText?: string;
    actionHandler?: () => void;
    isError: boolean;
    timeout: number;
}

/** Spec for the snackbar action object. */
export interface SnackbarAction {
    type: Action,
    data?: SnackbarData
}
