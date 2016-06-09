import {defaultValue as articleList} from '../article-list';
import {defaultValue as articleDetail} from '../article-detail';
import {rootReducer} from '../';
import {Action} from '../../actions';
import {omit} from 'lodash';

describe('rootReducer', () => {
    const state = {articleList, articleDetail};
    let newState: typeof state;
    describe('articleList', () => {
        describe('REQUEST_ARTICLE_LIST', () => {
            newState = rootReducer(state, {type: Action.REQUEST_ARTICLE_LIST});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(state, 'articleList'));
            });

            it('should update correctly the state with a REQUEST_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: [], isLoading: true});
            });
        });
        describe('SUCCESS_ARTICLE_LIST', () => {
            newState = rootReducer(state, {type: Action.SUCCESS_ARTICLE_LIST, list: [{test: 'ok'}]});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(state, 'articleList'));
            });

            it('should update correctly the state with a SUCCESS_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: [{test: 'ok'}], isLoading: false});
            });
        });
        describe('FAILURE_ARTICLE_LIST', () => {
            newState = rootReducer(state, {type: Action.FAILURE_ARTICLE_LIST, error: 'error'});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(state, 'articleList'));
            });

            it('should update correctly the state with a FAILURE_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({error: 'error', isLoading: false});
            });
        });
    });
});
