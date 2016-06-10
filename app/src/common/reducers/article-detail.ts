import {Action} from '../actions';
import {ArticleDetailAction, ArticleDetailState} from '../definitions/article-detail';

export const defaultValue: ArticleDetailState = {isLoading: false, article: {title: '', description: '', content: ''}, success: false};

/** Reducer that handles the `articleDetail` store node. */
export function articleDetail(state: ArticleDetailState = defaultValue, action: ArticleDetailAction) {
    switch (action.type) {
        case Action.LOAD_ARTICLE:
            return {
                article: action.article
            };
        case Action.UPDATE_ARTICLE:
            return {
                article: action.article
            };
        case Action.SUCCESS_SAVE_ARTICLE:
            return {
                isLoading: false,
                error: action.error,
                success: false,
                article: action.article
            };
        case Action.FAILURE_SAVE_ARTICLE:
            return {
                isLoading: false,
                error: action.error,
                success: false,
                article: defaultValue.article
            };
       case Action.UPDATE_ARTICLE:
            return {
                article: action.article
            };
        default:
            return state;
    }
}
