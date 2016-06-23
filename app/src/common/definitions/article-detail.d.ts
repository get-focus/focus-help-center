import {Action} from '../actions';
import {Article} from './article';


/** State spec for the `articleDetail` store node. */
export interface ArticleDetailState {
    article?: Article;
    error?: string;
    isEditDescription: boolean;
    isEditTitle: boolean;
    isLoading: boolean;
    showPopup: boolean;
}

/** Action spec for the `articleDetail` store node. */
export interface ArticleDetailAction {
    type: Action;
    article?: Article;
    error?: string;
    attribute?: string;
    value?: string | boolean;
}