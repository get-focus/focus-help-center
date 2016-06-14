import {saveArticle, deleteArticle, loadArticle} from '../article-detail';
import {apiMockData} from '../../server/api-mock';
import {Action} from '../../actions';

describe('Article Detail Actions', () => {
    describe('deleteArticle', () => {
        it('should dispatch request then success actions', done => {
            chai.expect(deleteArticle(1)).to.dispatch.actions([
                {type: Action.REQUEST_ACTION_ARTICLE},
                {type: Action.SUCCESS_DELETE_ARTICLE}
            ], done);
        });
    });

    describe('loadArticle', () => {
        it('should dispatch request then success actions', done => {
            chai.expect(loadArticle(1)).to.dispatch.actions([
                {type: Action.REQUEST_ACTION_ARTICLE},
                {
                    type: Action.SUCCESS_LOAD_ARTICLE,
                    article: apiMockData.getArticle
                }
            ], done);
        });
    });

    describe('saveArticle', () => {
        it('should dispatch request then receive actions', done => {
            chai.expect(saveArticle(apiMockData.getArticle)).to.dispatch.actions([
                {type: Action.REQUEST_ACTION_ARTICLE},
                {
                    type: Action.SUCCESS_SAVE_ARTICLE,
                    article: apiMockData.getArticle
                }
            ], done);
        });
    });
});
