import {combineReducers} from 'redux';
import {articleList} from './article-list';
import {articleDetail} from './article-detail';
import {login} from './login';
import {State} from '../store/default-state';

/** The root reducer, fed to the store creator. */
export const rootReducer = combineReducers<State>({
    articleDetail,
    articleList,
    login
});
