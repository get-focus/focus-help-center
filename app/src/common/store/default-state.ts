import {defaultValue as articleList} from '../reducers/article-list';
import {defaultValue as articleDetail} from '../reducers/article-detail';
import {defaultValue as sectionList} from '../reducers/section-list';
import {defaultValue as login} from '../reducers/login';
import {defaultValue as snackBar} from '../reducers/snack-bar';

export const defaultState = {
    articleList,
    articleDetail,
    sectionList,
    login,
    snackBar
};

export type State = typeof defaultState;
