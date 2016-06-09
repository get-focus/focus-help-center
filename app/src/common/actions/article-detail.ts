import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleDetailAction} from '../definitions/article-detail';
import {Api} from '../server/index';

/** Action creator to update article in store. */
export function updateArticle(article?: Article): ArticleDetailAction {
    return {
        type: Action.REQUEST_ARTICLE_LIST,
        article
    };
}

export function saveArticle(article) {
    return async (dispatch: Redux.Dispatch, getState, api: Api) => {
        dispatch(updateArticle(article));
        const returnedArticle = await api.saveArticle();
    }
}