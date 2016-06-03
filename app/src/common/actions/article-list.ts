import {Action} from './index';
import {Article} from '../definitions/article';
import {ArticleListAction} from '../definitions/article-list';

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
    return (dispatch: Redux.Dispatch) => {
        dispatch(requestArticleList());
        setTimeout(() => {
            const articleList = [
                {id: 1, title: 'Title', description: 'Description', content: 'Content'},
                {id: 2, title: 'Title2', description: 'Description2', content: 'Content2'}
            ];
            dispatch(receiveArticleList(articleList));
        }, 500);
    };
}
