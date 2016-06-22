import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleDetailAction, SnackbarAction} from '../definitions/article-detail';
import {Api} from '../server/index';
import i18n from 'i18next';
import {capitalize} from 'lodash';

/** Action creator called on any article request. */
function requestActionArticle(): ArticleDetailAction {
    return {type: Action.REQUEST_ACTION_ARTICLE};
}

/** Action creator called on successful article load. */
function successLoadArticle(article: Article): ArticleDetailAction {
    return {type: Action.SUCCESS_LOAD_ARTICLE, article};
}

/** Action creator called on successful article save. */
function successSaveArticle(article: Article, successHandler?: () => void, attribute?: string, unpublished?: boolean): any {
    return dispatch => {
        dispatch({type: Action.SUCCESS_SAVE_ARTICLE, article});
        if (successHandler) {
            dispatch(showSnackBar({
                actionHandler: successHandler,
                message: `edit-cartridge.content.snackBar.saveSuccessMessage${unpublished ? 'Un' : ''}${attribute ? capitalize(attribute) : ''}`,
                actionText: 'edit-cartridge.content.snackBar.saveActionText',
                isError: false
            }));
        }
    };
}

/** Action creator called on successful article suppression. */
function successDeleteArticle(): ArticleDetailAction {
    return {type: Action.SUCCESS_DELETE_ARTICLE};
}

/** Action creator called on any article error. */
function errorActionArticle(error: string, dispatchSnackbar?: boolean): any {
     return dispatch => {
        dispatch({type: Action.ERROR_ACTION_ARTICLE, error});
        if (dispatchSnackbar) {
            dispatch(showSnackBar({message: 'edit-cartridge.content.snackBar.saveFailedMessage', isError: true}));
        }
    };
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
function updateArticleAttribute(attribute: string, value: string | boolean): ArticleDetailAction {
    return {
        type: Action.UPDATE_ARTICLE,
        attribute,
        value
    };
}

/** Updates an attribute of the article in the store and saves it on the server. */
export function updateArticle(attribute: string, value: string | boolean, successHandler: () => void): any {
    return async (dispatch, getState, api: Api) => {
        dispatch(requestActionArticle());
        dispatch(updateArticleAttribute(attribute, value));
        try {
            const response = await api.saveArticle(Object.assign({}, getState().articleDetail.article, {[attribute]: value}));
            dispatch(successSaveArticle(response, successHandler, attribute, value === false));
        } catch (e) {
            dispatch(errorActionArticle(e.message, true));
        }
    };
}

/** Toggles the dialog. */
export function showEditPopup(): ArticleDetailAction {
    return {type: Action.SHOW_POPUP_EDITION};
}

/** Toggles the snackbar. */
export function showSnackBar(snackbarData?: SnackbarAction): ArticleDetailAction {
    return {
        type: Action.SHOW_EDIT_SNACKBAR,
        snackbarData: snackbarData ? {
            message: i18n.t(snackbarData.message),
            actionText: i18n.t(snackbarData.actionText),
            actionHandler: snackbarData.actionHandler,
            isError: snackbarData.isError
        } : undefined
    };
}

/** Toggles the edit title state. */
export function clickEditTitle(): ArticleDetailAction {
    return {type: Action.CLICK_EDIT_TITLE};
}

/** Toggles the edit description state. */
export function clickEditDescription(): ArticleDetailAction {
    return {type: Action.CLICK_EDIT_DESCRIPTION};
}
