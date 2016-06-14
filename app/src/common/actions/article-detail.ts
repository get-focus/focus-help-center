import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleDetailAction} from '../definitions/article-detail';
import {Api} from '../server/index';

/** Action creator called on any article request. */
function requestActionArticle(): ArticleDetailAction {
    return {type: Action.REQUEST_ACTION_ARTICLE};
}

/** Action creator called on successful article load. */
function successLoadArticle(article: Article): ArticleDetailAction {
    return {type: Action.SUCCESS_LOAD_ARTICLE, article};
}

/** Action creator called on successful article save. */
function successSaveArticle(article: Article): ArticleDetailAction {
    return {type: Action.SUCCESS_SAVE_ARTICLE, article};
}

/** Action creator called on successful article suppression. */
function successDeleteArticle(): ArticleDetailAction {
    return {type: Action.SUCCESS_DELETE_ARTICLE};
}

/** Action creator called on any article error. */
function errorActionArticle(error: string): ArticleDetailAction {
    return {type: Action.ERROR_ACTION_ARTICLE, error};
}

/** Clears the article store. */
export function clearArticle() {
    return {type: Action.CLEAR_ARTICLE};
}

/** Deletes an article. */
export function deleteArticle(id: number): any {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestActionArticle());
        try {
            await api.deleteArticle(id);
            dispatch(successDeleteArticle());
        } catch (e) {
            dispatch(errorActionArticle(e.message));
        }
    };
}

/** Load an article. */
export function loadArticle(id: number): any {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestActionArticle());
        try {
            const article = await api.getArticle(id);
            dispatch(successLoadArticle(article));
        } catch (e) {
            dispatch(errorActionArticle(e.message));
        }
    };
}

/** Saves an article. */
export function saveArticle(article: Article): any {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestActionArticle());
        try {
            const response = await api.saveArticle(article);
            dispatch(successSaveArticle(response));
        } catch (e) {
            dispatch(errorActionArticle(e.message));
        }
    };
}

/** Updates an attribute of the article in the store. */
export function updateArticle(attribute: string, value: string): ArticleDetailAction {
    return {
        type: Action.UPDATE_ARTICLE,
        attribute,
        value
    };
}
