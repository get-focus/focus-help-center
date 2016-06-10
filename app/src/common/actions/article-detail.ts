import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleDetailAction} from '../definitions/article-detail';
import {Api} from '../server/index';

/** Action creator to update article in store. */

export function loadArticleDetail(article: Article): any {
    console.log(article);
    return async (dispatch, getState) => {
        try {
            dispatch(successLoadArtictleDetail(article));
        } catch (err){
            throw err;
        }
    };
}

function successLoadArtictleDetail(article: Article): ArticleDetailAction {
    return {
        type: Action.LOAD_ARTICLE,
        article
    };
}

/**Update article action */
export function updateArticle(article: Article, attribute?: string, value?: string): any {
    article[`${attribute}`] = value;
    return async (dispatch, getState) => {
        try {
            dispatch(successUpdateArtictleDetail(article));
        } catch (err) {
            throw err;
        }
    };
}

function successUpdateArtictleDetail(article: Article): ArticleDetailAction {
    return {
        type: Action.UPDATE_ARTICLE,
        article
    };
}

/** Save article action */
export function saveArticle(article: Article): any {
    return async (dispatch, api: Api) => {
        try {
            dispatch(successSaveDetail(await api.saveArticle(article), article));
        } catch (error) {
            dispatch(failSaveDetail(error));
        }
    };
}

function successSaveDetail(success: boolean, article: Article): ArticleDetailAction {
    return {
        type: Action.SUCCESS_SAVE_ARTICLE,
        success,
        article
    };
}

function failSaveDetail(error: string): ArticleDetailAction {
    return {
        type: Action.FAILURE_SAVE_ARTICLE,
        error
    };
}

// TODO: DELETE ARTICLE ACTION
