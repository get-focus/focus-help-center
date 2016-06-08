import {Action} from '../actions';
import {ArticleListState, ArticleListAction} from '../definitions/article-list';

export const defaultValue: ArticleListState = {isLoading: false, list: []};

/** Reducer that handles the `articleList` store node. */
export function articleList(state: ArticleListState = defaultValue, action: ArticleListAction) {
    switch (action.type) {
        case Action.REQUEST_ARTICLE_LIST:
            return {
                isLoading: true,
                list: []
            };
        case Action.SUCCESS_ARTICLE_LIST:
            return {
                isLoading: false,
                list: action.list
            };
        case Action.FAILURE_ARTICLE_LIST:
            return {
                isLoading: false,
                error: action.error
            };
        default:
            return state;
    }
}
