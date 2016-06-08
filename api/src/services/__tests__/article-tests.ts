import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {IArticle} from '../../db/article';
import {article1, article2, article3} from '../../db/init-test-data';

describe('Testing the services', () => {

    describe('When call an article with its ID', () => {
        let fetchDB: IArticle;
        before(mochaAsync(async () => {
            const response = await fetch('http://localhost:3000/api/article/2');
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            fetchDB = await response.json<IArticle>();
        }));
        it('should return the good Article', () => {
            chai.expect(fetchDB.id).to.equal(article2.id);
            chai.expect(fetchDB.title).to.equal(article2.title);
            chai.expect(fetchDB.description).to.equal(article2.description);
            chai.expect(fetchDB.content).to.equal(article2.content);
        });
    });

    describe('When call all the articles', () => {
        let fetchDB: IArticle;
        before(mochaAsync(async () => {
            const response = await fetch('http://localhost:3000/api/article');
            if (response.status >= 400) {
                throw new Error('Bad response from server');
            }
            fetchDB = await response.json<IArticle>();
        }));
        it('should return an array', () => {
            chai.expect(fetchDB).to.be.a('array');
            chai.expect(fetchDB[1].description).to.equal(article2.description);
            chai.expect(fetchDB[0].title).to.equal(article1.title);
            chai.expect(fetchDB[2].id).to.equal(article3.id);
        });
    });
});