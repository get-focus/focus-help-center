import {loadArticleList} from '../article-list';
import {Action} from '../../actions/index';
import {api} from '../../../../test/api-mock';

describe('loadArticleList', () => {
    it('should dispatch some actions', async (done) => {
        chai.expect(loadArticleList()).to.dispatch.actions([{
            type: Action.RequestArticleList
        }, {
            type: Action.ReceiveArticleList,
            list: await api.loadArticleList()
        }], done);
    });
});
