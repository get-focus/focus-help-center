import {Action} from '../actions';
import {ArticleDetailAction, ArticleDetailState} from '../definitions/article-detail';

export const defaultValue: ArticleDetailState = {isLoading: false};

/** Reducer that handles the `articleDetail` store node. */
export function articleDetail(state: ArticleDetailState = defaultValue, action: ArticleDetailAction) {
    switch (action.type) {
        case Action.UPDATE_ARTICLE:
            // TODO: update state with only non-undefined article members.
            return state;
        default:
            return state;
    }
}