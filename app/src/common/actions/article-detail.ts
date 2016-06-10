import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleDetailAction} from '../definitions/article-detail';
import {Api} from '../server/index';

/** Action creator to update article in store. */

// TODO: in the future, this will load an existing article. Taken by its ID from the URL query or POST data
export function loadArticleDetail(article: Article): any {
    console.log(article);
    return async (dispatch, getState) => {
        try {
            dispatch(successLoadArtictleDetail(article));
        } catch (err) {
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
export function updateArticle(attribute: string, value: string): ArticleDetailAction {
    return {
        type: Action.UPDATE_ARTICLE,
        attribute,
        value
    };
}

/** Save article action */
export function saveArticle(article: Article): any {
    return async (dispatch, getState, api: Api) => {
        try {
            const response = await api.saveArticle(article);
            if (response === true) {
                dispatch({type: Action.SUCCESS_SAVE_ARTICLE});
            } else {
                dispatch(failSaveDetail(response as string));
            }

            // Set timeout and do an action which make success to false
        } catch (error) {
            dispatch(failSaveDetail(error));
        }
    };
}

function failSaveDetail(error: string): ArticleDetailAction {
    return {
        type: Action.FAILURE_SAVE_ARTICLE,
        error
    };
}

// TODO: DELETE ARTICLE ACTION
