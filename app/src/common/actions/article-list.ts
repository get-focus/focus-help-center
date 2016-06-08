import {Action} from './index';
import {Article} from '../definitions/article';
import {ArticleListAction} from '../definitions/article-list';
import {Api} from '../server/index';

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

/** Loads the article list. Dispatches the request immediately and the result when it's loaded. */
export function loadArticleList() {
    return async (dispatch: Redux.Dispatch, getState, api: Api) => {
        dispatch(requestArticleList());
        try {
            const articleList = await api.loadArticleList();
            dispatch(successArticleList(articleList));
        } catch (err) {
            dispatch(failureArticleList(err.message));
        }
    };
}
