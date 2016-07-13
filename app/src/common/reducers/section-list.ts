import {Action} from '../actions';
import {SectionListAction, SectionListState} from '../definitions/section-list';

export const defaultValue: SectionListState = { isLoading: false, list: [] };

/** Reducer that handles the `sectionList` store node. */
export function sectionList(state: SectionListState = defaultValue, action: SectionListAction) {
    switch (action.type) {
        case Action.REQUEST_SECTION_LIST:
            return Object.assign({}, state, { isLoading: true });
        case Action.SUCCESS_SECTION_LIST:
            return {
                isLoading: false,
                list: action.list,
            };
        case Action.FAILURE_SECTION_LIST:
            return {
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}
