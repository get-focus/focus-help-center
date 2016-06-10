import {Action} from '../actions';
import {ArticleDetailAction, ArticleDetailState} from '../definitions/article-detail';
const a = Object.assign;

export const defaultValue: ArticleDetailState = {isLoading: false, article: {title: '', description: '', content: ''}, success: false};

/** Reducer that handles the `articleDetail` store node. */
export function articleDetail(state: ArticleDetailState = defaultValue, action: ArticleDetailAction) {
    switch (action.type) {
        case Action.LOAD_ARTICLE:
            return {
                article: action.article
            };
        case Action.SUCCESS_SAVE_ARTICLE:
            return {
                isLoading: false,
                success: true,
                article: state.article
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
            // TODO: here it will be the action to set success to false look at successSaveArticle from the ACTIONS
        case 142155:
            return a({}, state, {success: false});
        default:
            return state;
    }
}
