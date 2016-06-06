import {loadArticleList} from '../article-list';
import {Action} from '../../actions/index';
import {apiMockData} from '../../server/api-mock';

describe('loadArticleList', () => {
    it('should dispatch request then receive actions', done => {
        chai.expect(loadArticleList()).to.dispatch.actions([{
            type: Action.RequestArticleList,
            isLoading: true
        }, {
            type: Action.ReceiveArticleList,
            list: apiMockData.loadArticleList
        }], done);
    });
});
