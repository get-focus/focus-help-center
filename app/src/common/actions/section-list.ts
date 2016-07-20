import {Action} from './';
import {Section} from '../definitions/section';
import {SectionListAction} from '../definitions/section-list';
import {Api} from '../server/';

/** Action creator called on load request. */
function requestSectionList(): SectionListAction {
    return {
        type: Action.REQUEST_SECTION_LIST
    };
}

/** Action creator called on successful request. */
function successSectionList(list: Section[]): SectionListAction {
    return {
        type: Action.SUCCESS_SECTION_LIST,
        list
    };
}

/** Action creator called on failed request. */
function failureSectionList(error: string): SectionListAction {
    return {
        type: Action.FAILURE_SECTION_LIST,
        error
    };
}

/** Loads the section list. Dispatches the request immediately and the result when it's loaded. */
export function loadSectionList(): any {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestSectionList());
        try {
            const sectionList = await api.loadSectionList();
            dispatch(successSectionList(sectionList));
        } catch (err) {
            dispatch(failureSectionList(err.message));
        }
    };
}

/** Loads the section list. Dispatches the request immediately and the result when it's loaded. */
export function clearSectionList(): any {
    return {
        type: Action.CLEAR_SECTION_LIST
    };
}

