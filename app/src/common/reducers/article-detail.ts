import {Action} from '../actions';
import {ArticleDetailAction, ArticleDetailState} from '../definitions/article-detail';
const a = Object.assign;

export const defaultValue: ArticleDetailState = {isLoading: false, article: {title: '', description: '', content: ''}, success: false};

/** Reducer that handles the `articleDetail` store node. */
export function articleDetail(state = defaultValue, action: ArticleDetailAction) {
    switch (action.type) {
        case Action.LOAD_ARTICLE:
            return {
                isLoading: false,
                success: false,
                article: action.article
            };
        case Action.SUCCESS_SAVE_ARTICLE:
            return {
                isLoading: false,
                success: true,
                article: action.article
            };
        case Action.FAILURE_SAVE_ARTICLE:
            return {
                isLoading: false,
                error: action.error,
                success: false,
                article: state.article
            };
        case Action.UPDATE_ARTICLE:
            return {
                article: a({}, state.article, {[action.attribute]: action.value}),
                isLoading: false
            };
        case Action.REQUEST_ARTICLE_DELETE:
            return {
                isLoading: true,
                article: state.article
            };
        case Action.SUCCESS_ARTICLE_DELETE:
            return {
                isLoading: false
            };
        case Action.SWITCH_DETAIL_SUCCESS:
            return a({}, state, {success: false});
        default:
            return state;
    }
}
