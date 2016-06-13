import {Action} from './';
import {Article} from '../definitions/article';
import {ArticleDetailAction} from '../definitions/article-detail';
import {Api} from '../server/index';

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
            dispatch({ type: Action.SUCCESS_SAVE_ARTICLE, article: response });

            dispatch(getArticle(response['id']));
            setTimeout(function () {
                dispatch({ type: Action.SWITCH_DETAIL_SUCCESS });
            }, 3000);
        } catch (error) {
            dispatch(failSaveDetail(error));
        }
    };
}

/**Get article action */
export function getArticle(id: number): any {
    return async (dispatch, getState, api: Api) => {
        try {
            let response;
            if (id) {
                response = await api.getArticle(id);
            } else {
                response = ({ title: '', description: '', content: '' });
            }
            dispatch({ type: Action.LOAD_ARTICLE, article: response });
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

/** Deletes an article */
export function deleteArticle(id: number, article: Article): any {
    return async (dispatch, getState, api: Api) => {
        dispatch({ type: Action.REQUEST_ARTICLE_DELETE });
        try {
            const response = await api.deleteArticle(id);
            if (response === true) {
                dispatch({ type: Action.SUCCESS_ARTICLE_DELETE, article: article });
            } else {
                dispatch(failSaveDetail(response as string));
            }
        } catch (error) {
            dispatch(failSaveDetail(error));
        }
    };
}
