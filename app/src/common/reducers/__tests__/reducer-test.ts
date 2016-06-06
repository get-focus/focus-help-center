import {defaultValue as articleList} from '../article-list';
import {rootReducer} from '../index';
import {Action} from '../../actions/index';
import {omit} from 'lodash';

describe('rootReducer', () => {
    const state = {articleList};

    describe('articleList', () => {
        describe('RequestArticleList', () => {
            const newState = rootReducer(state, {type: Action.RequestArticleList});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(state, 'articleList'));
            });

            it('should update correctly the state with a RequestArticleList action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: [], isLoading: true});
            });
        });
        describe('ReceiveArticleList', () => {
            const newState = rootReducer(state, {type: Action.ReceiveArticleList, list: [{test: 'ok'}]});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(state, 'articleList'));
            });

            it('should update correctly the state with a ReceiveArticleList action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: [{test: 'ok'}], isLoading: false});
            });
        });
        describe('FailureArticleList', () => {
            const newState = rootReducer(state, {type: Action.FailureArticleList, error: 'error'});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(state, 'articleList'));
            });

            it('should update correctly the state with a FailureArticleList action', () => {
                chai.expect(newState.articleList).to.deep.equal({error: 'error', isLoading: false});
            });
        });
    });
});
