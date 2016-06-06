import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {IArticle} from '../../db/article';

describe('Testing the services', () => {

    describe('When call an article with its ID', () => {
        let fetchDB: IArticle;
        before(mochaAsync(async () => {
            const response = await fetch('http://localhost:3000/api/article/2');
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            fetchDB = await response.json<IArticle>();
        }));
        it('should return the good Article', () => {
            chai.expect(fetchDB.id).to.equal(2);
            chai.expect(fetchDB.title).to.equal('The Second');
            chai.expect(fetchDB.content).to.equal('Blablabla is the base : 2');
        });
    });
});