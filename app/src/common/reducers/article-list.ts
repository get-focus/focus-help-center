import {Action} from '../actions/index';
import {ArticleListState, ArticleListAction} from '../definitions/article-list';

const defaultValue: ArticleListState = {isLoading: false, list: []};

/** Reducer that handles the `articleList` store node. */
export function articleList(state: ArticleListState = defaultValue, action: ArticleListAction) {
    switch (action.type) {
        case Action.RequestArticleList:
            return {
                isLoading: true,
                list: []
            };
        case Action.ReceiveArticleList:
            return {
                isLoading: false,
                list: action.list
            };
        default:
            return state;
    }
}
