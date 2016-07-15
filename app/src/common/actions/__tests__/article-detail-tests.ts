import {saveArticle, deleteArticle, loadArticle, updateArticle, manageArticleSection} from '../article-detail';
import {apiMockData, article1, section1, section2} from '../../server/api-mock';
import {Action} from '../../actions';
import {defaultValue as articleDetail} from '../../reducers/article-detail';

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

    describe('updateArticle', () => {
        it('should dispatch request then receive actions', done => {
            chai.expect(updateArticle('title', 'title', () => null)).with.state({articleDetail}).to.dispatch.actions([
                {
                    type: Action.UPDATE_ARTICLE,
                    attribute: 'title',
                    value: 'title'
                },
                {
                    type: Action.SUCCESS_SAVE_ARTICLE,
                    article: {title: 'title', description: '', content: '', published: false}
                },
                {type: Action.SHOW_EDIT_SNACKBAR}
            ], done);
        });
    });

    describe('manageArticleSection', () => {
        it('should dispatch request then receive actions', done => {
            const sections = [section1, section2], attribute = 'sections';

            chai.expect(manageArticleSection(article1, attribute, sections, () => null)).with.state({articleDetail}).to.dispatch.actions([
                {
                    type: Action.UPDATE_ARTICLE,
                    attribute: attribute,
                    value: sections
                },
                {
                    type: Action.SUCCESS_SAVE_ARTICLE,
                    article: {title: '', description: '', content: '', sections: sections, published: false }
                },
                {type: Action.SHOW_EDIT_SNACKBAR}
            ], done);
        });
    });
});
