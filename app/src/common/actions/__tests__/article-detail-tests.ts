import {saveArticle} from '../article-detail';
import {Action} from '../../actions';

describe('action: saveArticle', () => {
    it('should dispatch request then receive actions', done => {
        chai.expect(saveArticle({title: 'Test', description: 'My test', content: 'the test content'})).to.dispatch.actions([{
            type: Action.SUCCESS_SAVE_ARTICLE
        }], done);
    });
});
