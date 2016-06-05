import {Action} from './index';
import {Article} from '../definitions/article';
import {ArticleListAction} from '../definitions/article-list';
// import {api} from './api';
import {api} from '../../../test/api-mock';

/** Action creator called on load request. */
function requestArticleList(): ArticleListAction {
    return {
        type: Action.RequestArticleList,
        isLoading: true
    };
}

/** Action creator called on successful request. */
function receiveArticleList(list: Article[]): ArticleListAction {
    return {
        type: Action.ReceiveArticleList,
        list
    };
}

/** Loads the article list, with fake data. */
export function loadArticleList() {
    return async (dispatch: Redux.Dispatch) => {
        dispatch(requestArticleList());
        const articleList = await api.loadArticleList();
        dispatch(receiveArticleList(articleList));
    };
}
