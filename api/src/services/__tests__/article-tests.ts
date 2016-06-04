import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import request from 'request';

describe('Testing the services', () => {
    describe('When call an article with its ID', () => {
        let couchdb;
        before(mochaAsync(async () => {
            couchdb = await fetch('http://localhost:3000/api/article/1').then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            });
        }));
        it('should return the good Article', () => {
            chai.expect(couchdb.title).to.equal('Tools');
        });
    });
});