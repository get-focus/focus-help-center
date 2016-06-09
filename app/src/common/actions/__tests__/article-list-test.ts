import {loadArticleList} from '../article-list';
import {Action} from '../../actions';
import {apiMockData} from '../../server/api-mock';

describe('action: loadArticleList', () => {
    it('should dispatch request then receive actions', done => {
        chai.expect(loadArticleList()).to.dispatch.actions([{
            type: Action.REQUEST_ARTICLE_LIST
        }, {
            type: Action.SUCCESS_ARTICLE_LIST,
            list: apiMockData.loadArticleList
        }], done);
    });
});
