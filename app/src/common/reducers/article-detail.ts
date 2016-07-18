import {Action} from '../actions';
import {ArticleDetailAction, ArticleDetailState} from '../definitions/article-detail';
const a = Object.assign;

export const defaultValue: ArticleDetailState = {
    article: {title: '', description: '', content: '', informations: '', url: '', published: false},
    isEditDescription: false,
    isEditTitle: false,
    isEditUrl: false,
    isEditInformations: false,
    isLoading: false,
    showPopup: false
};

/** Reducer that handles the `articleDetail` store node. */
export function articleDetail(state = defaultValue, action: ArticleDetailAction) {
    switch (action.type) {
        case Action.REQUEST_ACTION_ARTICLE:
            return a({}, state, {
                isLoading: true,
                article: state.article
            });
        case Action.SUCCESS_LOAD_ARTICLE:
        case Action.SUCCESS_SAVE_ARTICLE:
            return a({}, state, {
                isLoading: false,
                article: action.article
            });
        case Action.SUCCESS_DELETE_ARTICLE:
            return a({}, state, {
                isLoading: false,
                article: defaultValue.article
            });
        case Action.ERROR_ACTION_ARTICLE:
            return a({}, state, {
                isLoading: false,
                error: action.error
            });
        case Action.UPDATE_ARTICLE:
            return a({}, state, {
                article: a({}, state.article, {[action.attribute]: action.value}),
                isLoading: true
            });
        case Action.CLEAR_ARTICLE:
            return defaultValue;
        case Action.SHOW_POPUP_EDITION:
            return a({}, state, {showPopup: !state.showPopup});
        case Action.CLICK_EDIT_DESCRIPTION:
            return a({}, state, {isEditDescription: !state.isEditDescription});
        case Action.CLICK_EDIT_TITLE:
            return a({}, state, {isEditTitle: !state.isEditTitle});
        case Action.CLICK_EDIT_URL:
            return a({}, state, {isEditUrl: !state.isEditUrl});
        case Action.CLICK_EDIT_INFORMATIONS:
            return a({}, state, {isEditInformations: !state.isEditInformations});
        default:
            return state;
    }
}
