import {loadArticleList} from '../article-list';
import {Action} from '../../actions/index';

describe('loadArticleList', () => {
    it('should dispatch some actions', () => {
        chai.expect(loadArticleList()).to['dispatch'].actions({type: Action.RequestArticleList});
    });
});
