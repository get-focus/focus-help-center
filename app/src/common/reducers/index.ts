import {combineReducers} from 'redux';
import {articleList} from './article-list';
import {articleDetail} from './article-detail';

/** The root reducer, fed to the store creator. */
export const rootReducer = combineReducers<any>({
    articleDetail,
    articleList
});
