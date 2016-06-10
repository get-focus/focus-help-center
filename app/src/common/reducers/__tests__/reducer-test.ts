import {defaultState} from '../../store/default-state';
import {rootReducer} from '../';
import {Action} from '../../actions';
import {omit} from 'lodash';

describe('rootReducer', () => {

    describe('saveArticle', () => {
        describe('SUCCESS_SAVE_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.SUCCESS_SAVE_ARTICLE});
            newState.articleDetail.article = {title: '', description: '', content: ''};
            it('should correctly set the state with a SUCCESS_SAVE_ARTICLE action', () => {
                chai.expect(newState.articleDetail).to.deep.equal({isLoading: false, success: true, article: {title: '', description: '', content: ''}});
            });
        });
        describe('LOAD_ARTICLE', () => {
            const newState = rootReducer(defaultState, {type: Action.LOAD_ARTICLE});
            newState.articleDetail.article = {title: '', description: '', content: ''};
            it('should correctly set the state with a LOAD_ARTICLE action', () => {
                chai.expect(newState.articleDetail).to.deep.equal({isLoading: false, success: false, article: {title: '', description: '', content: ''}});
            });
        });
    });

    describe('login', () => {
        describe('REQUEST_LOGIN', () => {
            const newState = rootReducer(defaultState, {type: Action.REQUEST_LOGIN});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'login')).to.deep.equal(omit(defaultState, 'login'));
            });

            it('should update correctly the state with a REQUEST_LOGIN action', () => {
                chai.expect(newState.login).to.deep.equal({isConnected: false, isLoading: true});
            });
        });

        describe('RECEIVE_LOGIN', () => {
            const newState = rootReducer(defaultState, {type: Action.RECEIVE_LOGIN, isConnected: true});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'login')).to.deep.equal(omit(defaultState, 'login'));
            });

            it('should update correctly the state with a RECEIVE_LOGIN action', () => {
                chai.expect(newState.login).to.deep.equal({isConnected: true, isLoading: false});
            });
        });

        describe('FAILURE_LOGIN', () => {
            const newState = rootReducer(defaultState, {type: Action.FAILURE_LOGIN, error: 'error'});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'login')).to.deep.equal(omit(defaultState, 'login'));
            });

            it('should update correctly the state with a FAILURE_LOGIN action', () => {
                chai.expect(newState.login).to.deep.equal({isLoading: false, isConnected: false, error: 'error'});
            });
        });
    });

    describe('articleList', () => {
        describe('REQUEST_ARTICLE_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.REQUEST_ARTICLE_LIST});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(defaultState, 'articleList'));
            });

            it('should update correctly the state with a REQUEST_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: [], isLoading: true});
            });
        });

        describe('SUCCESS_ARTICLE_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.SUCCESS_ARTICLE_LIST, list: [{test: 'ok'}]});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(defaultState, 'articleList'));
            });

            it('should update correctly the state with a SUCCESS_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({list: [{test: 'ok'}], isLoading: false});
            });
        });

        describe('FAILURE_ARTICLE_LIST', () => {
            const newState = rootReducer(defaultState, {type: Action.FAILURE_ARTICLE_LIST, error: 'error'});

            it('shouldn\'t alter the remaining state nodes', () => {
                chai.expect(omit(newState, 'articleList')).to.deep.equal(omit(defaultState, 'articleList'));
            });

            it('should update correctly the state with a FAILURE_ARTICLE_LIST action', () => {
                chai.expect(newState.articleList).to.deep.equal({error: 'error', isLoading: false});
            });
        });
    });
});
