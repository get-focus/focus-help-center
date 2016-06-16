import {Action} from '../actions';
import {ArticleListState, ArticleListAction} from '../definitions/article-list';

export const defaultValue: ArticleListState = {isLoading: false, list: []};

/** Reducer that handles the `articleList` store node. */
export function articleList(state: ArticleListState = defaultValue, action: ArticleListAction) {
    switch (action.type) {
        case Action.REQUEST_ARTICLE_LIST:
            return Object.assign({}, state, {isLoading: true});
        case Action.SUCCESS_ARTICLE_LIST:
            return {
                isLoading: false,
                list: action.list,
                filter: state.filter
            };
        case Action.FAILURE_ARTICLE_LIST:
            return {
                isLoading: false,
                error: action.error,
                filter: state.filter
            };
        case Action.UPDATE_ARTICLE_LIST_FILTER:
            return {
                isLoading: false,
                filter: action.filter,
                list: state.list
            };
        default:
            return state;
    }
}
