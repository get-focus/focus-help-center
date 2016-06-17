import {Action} from '../actions';
import {ArticleDetailAction, ArticleDetailState} from '../definitions/article-detail';
const a = Object.assign;

export const defaultValue: ArticleDetailState = {isLoading: false, article: {title: '', description: '', content: '', published: false}, showPopup: false, showEditSnackbar: false};

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
                isLoading: false
            });
        case Action.CLEAR_ARTICLE:
            return defaultValue;
        case Action.SHOW_POPUP_EDITION:
            return a({}, state, {showPopup: !state.showPopup});
        case Action.SHOW_EDIT_SNACKBAR:
            return a({}, state, {showEditSnackbar: !state.showEditSnackbar, snackbarData: action.snackbarData});
        default:
            return state;
    }
}
