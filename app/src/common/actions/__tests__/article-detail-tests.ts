import {saveArticle, deleteArticle} from '../article-detail';
import {Action} from '../../actions';

describe('action: saveArticle', () => {
    it('should dispatch request then receive actions', done => {
        chai.expect(saveArticle({title: 'Test', description: 'My test', content: 'the test content'})).to.dispatch.actions([{
            type: Action.SUCCESS_SAVE_ARTICLE
        }], done);
    });
});

describe('action: deleteArticle', () => {
    it('should dispatch request then success actions', done => {
        chai.expect(deleteArticle(1)).to.dispatch.actions([
            {type: Action.REQUEST_ARTICLE_DELETE},
            {type: Action.SUCCESS_ARTICLE_DELETE}
        ], done);
    });
});
