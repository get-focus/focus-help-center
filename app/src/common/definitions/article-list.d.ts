import {Action} from '../actions/index';
import {Article} from './article';

/** State spec for the `articleList` store node. */
export interface ArticleListState {
    isLoading?: boolean,
    list?: Article[]
}

/** Action spec for the `articleList` store node. */
export interface ArticleListAction extends ArticleListState {
    type: Action
}