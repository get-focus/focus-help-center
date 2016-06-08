import {Action} from '../actions/index';
import {Article} from './article';

/** State spec for the `articleDetail` store node. */
export interface ArticleDetailState {
    isLoading?: boolean;
    article?: Article;
    error?: string;
}

/** Action spec for the `articleDetail` store node. */
export interface ArticleDetailAction {
    type: Action;
    article?: Article;
    error?: string;
}