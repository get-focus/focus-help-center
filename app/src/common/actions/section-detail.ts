import {Action} from './';
import {Section} from '../definitions/section';
import {SectionDetailAction} from '../definitions/section-detail';
import {Api} from '../server/index';
import {showSnackBar} from './snack-bar';

/** Action creator called on any section request. */
function requestActionSection(): SectionDetailAction {
    return { type: Action.REQUEST_ACTION_SECTION };
}

/** Action creator called on successful section load. */
function successLoadSection(section: Section): SectionDetailAction {
    return { type: Action.SUCCESS_LOAD_SECTION, section };
}

/** Clears the section store. */
export function clearSection() {
    return { type: Action.CLEAR_SECTION };
}

/** Action creator called on any section error. */
function errorActionSection(error: string, dispatchSnackbar?: boolean): any {
    return dispatch => {
        dispatch({ type: Action.ERROR_ACTION_SECTION, error });
        if (dispatchSnackbar) {
            dispatch(showSnackBar({ message: 'edit-cartridge.content.snackBar.saveFailedMessage', isError: true }));
        }
    };
}

/** Load a section. */
export function loadSection(id: number): any {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestActionSection());
        try {
            const section = await api.getSection(id);
            dispatch(successLoadSection(section));
        } catch (e) {
            dispatch(errorActionSection(e.message));
        }
    };
}
