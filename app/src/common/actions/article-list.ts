import {Action} from './index';
import {Article} from '../definitions/article';
import {ArticleListAction} from '../definitions/article-list';
import {Api} from '../server/index';

/** Action creator called on load request. */
function requestArticleList(): ArticleListAction {
    return {
        type: Action.RequestArticleList
    };
}

/** Action creator called on successful request. */
function receiveArticleList(list: Article[]): ArticleListAction {
    return {
        type: Action.ReceiveArticleList,
        list
    };
}

function failureArticleList(error: string): ArticleListAction {
    return {
        type: Action.FailureArticleList,
        error
    };
}

/** Loads the article list. Dispatches the request immediately and the result when it's loaded. */
export function loadArticleList() {
    return async (dispatch: Redux.Dispatch, getState, api: Api) => {
        dispatch(requestArticleList());
        try {
            const articleList = await api.loadArticleList();
            dispatch(receiveArticleList(articleList));
        } catch (err) {
            dispatch(failureArticleList(err.message));
        }
    };
}
