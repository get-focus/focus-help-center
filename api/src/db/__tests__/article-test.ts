import {Article} from '../index';
import mochaAsync from '../../../test/mocha-async';

describe('article', () => {
    describe('article-load', () => {
        it('should contains an article instance', mochaAsync(async () => {
            const article = await Article.find();
            chai.expect(article.get()).haveOwnPropertyDescriptor('title');
            chai.expect(article.get()).haveOwnPropertyDescriptor('description');
            chai.expect(article.get()).haveOwnPropertyDescriptor('content');
        }));
    });
});
