import {Action} from '../actions/index';
import {Article} from './article';

/** State spec for the `articleList` store node. */
export interface ArticleListState {
    isLoading?: boolean;
    list?: Article[];
    error?: string;
}

/** Action spec for the `articleList` store node. */
export interface ArticleListAction {
    type: Action;
    list?: Article[];
    error?: string;
}