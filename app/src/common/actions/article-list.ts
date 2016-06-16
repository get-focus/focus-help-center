import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleListAction} from '../definitions/article-list';
import {Api} from '../server/';

/** Action creator called on load request. */
function requestArticleList(): ArticleListAction {
    return {
        type: Action.REQUEST_ARTICLE_LIST
    };
}

/** Action creator called on successful request. */
function successArticleList(list: Article[]): ArticleListAction {
    return {
        type: Action.SUCCESS_ARTICLE_LIST,
        list
    };
}

/** Action creator called on failed request. */
function failureArticleList(error: string): ArticleListAction {
    return {
        type: Action.FAILURE_ARTICLE_LIST,
        error
    };
}

/** Updates the filter on the article list. */
function updateFilter(filter: string): ArticleListAction {
    return {type: Action.UPDATE_ARTICLE_LIST_FILTER, filter};
}

/** Loads the article list. Dispatches the request immediately and the result when it's loaded. */
export function loadArticleList(filter?: string) {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestArticleList());
        try {
            const articleList = await api.loadArticleList(filter);
            dispatch(successArticleList(articleList));
        } catch (err) {
            dispatch(failureArticleList(err.message));
        }
    };
}

/** Filters the article list. */
export function searchArticleList(filter: string) {
    return dispatch => {
        dispatch(updateFilter(filter));
        dispatch(loadArticleList(filter));
    };
}
