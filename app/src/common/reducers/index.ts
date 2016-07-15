import {combineReducers} from 'redux';
import {articleList} from './article-list';
import {articleDetail} from './article-detail';
import {sectionList} from './section-list';
import {sectionDetail} from './section-detail';
import {login} from './login';
import {snackBar} from './snack-bar';
import {State} from '../store/default-state';

/** The root reducer, fed to the store creator. */
export const rootReducer = combineReducers<State>({
    articleDetail,
    articleList,
    sectionDetail,
    sectionList,
    login,
    snackBar
});
