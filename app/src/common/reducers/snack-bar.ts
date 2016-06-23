import {Action} from '../actions';
import {SnackbarAction, SnackbarState} from '../definitions/snack-bar';

export const defaultValue: SnackbarState = {
    show: false,
    message: '',
    isError: false,
    timeout: 3000
};

/** Reducer that handles the `articleDetail` store node. */
export function snackBar(state = defaultValue, action: SnackbarAction): SnackbarState {
    if (action.type === Action.SHOW_EDIT_SNACKBAR) {
        return Object.assign({}, Object.assign({}, {message: state.message, isError: state.isError}, action.data), {timeout: 3000, show: !state.show});
    } else {
        return state;
    }
}
