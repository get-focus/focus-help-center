import {Action} from '../actions';
import {SectionDetailAction, SectionDetailState} from '../definitions/section-detail';
const a = Object.assign;

export const defaultValue: SectionDetailState = {
    section: {name: ''}
};

/** Reducer that handles the `sectionDetail` store node. */
export function sectionDetail(state = defaultValue, action: SectionDetailAction) {
    switch (action.type) {
        case Action.REQUEST_ACTION_SECTION:
            return a({}, state, {
                isLoading: true,
                section: state.section
            });
        case Action.SUCCESS_LOAD_SECTION:
            return a({}, state, {
                isLoading: false,
                section: action.section
            });
        case Action.ERROR_ACTION_SECTION:
            return a({}, state, {
                isLoading: false,
                error: action.error
            });
        case Action.CLEAR_SECTION:
            return defaultValue;
        default:
            return state;
    }
}
