import {defaultValue as articleList} from '../reducers/article-list';
import {defaultValue as articleDetail} from '../reducers/article-detail';
import {defaultValue as login} from '../reducers/login';

export const defaultState = {
    articleList,
    articleDetail,
    login
};

export type State = typeof defaultState;
