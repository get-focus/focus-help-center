import {loadArticleList, searchArticleList} from '../article-list';
import {Action} from '../../actions';
import {apiMockData} from '../../server/api-mock';

describe('Action Article List', () => {
    describe('loadArticleList', () => {
        it('should dispatch request then receive actions', done => {
            chai.expect(loadArticleList()).to.dispatch.actions([{
                type: Action.REQUEST_ARTICLE_LIST
            }, {
                type: Action.SUCCESS_ARTICLE_LIST,
                list: apiMockData.loadArticleList
            }], done);
        });
    });

    describe('searchArticleList', () => {
        it('should dispatch update then load actions', done => {
            chai.expect(searchArticleList('filter')).to.dispatch.actions([
                {type: Action.UPDATE_ARTICLE_LIST_FILTER, filter: 'filter'},
                loadArticleList('filter')
            ], done);
        });
    });
});
