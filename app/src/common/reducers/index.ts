import {combineReducers} from 'redux';
import {articleList} from './article-list';

/** The root reducer, fed to the store creator. */
export const rootReducer = combineReducers({
    articleList
});
