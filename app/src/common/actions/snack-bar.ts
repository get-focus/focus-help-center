import {SnackbarAction, SnackbarData} from '../definitions/snack-bar';
import {Action} from './';
import i18n from 'i18next';

/** Toggles the snackbar. */
export function showSnackBar(data?: SnackbarData): SnackbarAction {
    return {
        type: Action.SHOW_EDIT_SNACKBAR,
        data: data ? {
            message: i18n.t(data.message),
            actionText: i18n.t(data.actionText),
            actionHandler: data.actionHandler,
            isError: data.isError
        } : undefined
    };
}
