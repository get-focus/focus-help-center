import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {IArticle} from '../../db/article';
import {article1, article2, article3} from '../../db/init-test-data';
import {loginAndGetCookie} from './login';
import {omit} from 'lodash';

describe('Article', () => {
    describe('GET /article/:id', () => {
        it('should return the correct published article when not connected', mochaAsync(async () => {
            const article = await(await fetch('http://localhost:3000/api/article/2')).json<IArticle>();
            chai.expect(omit(article, 'createdAt', 'updatedAt')).to.deep.equal(omit(article2, 'createdAt', 'updatedAt'));
        }));
        it('should return an error when the requested article is unpublished and not connected', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:3000/api/article/3')).json();
            chai.expect(response).to.deep.equal({error: 'This article isn\'t published'});
        }));
        it('should return the correct unpublished article when connected', mochaAsync(async () => {
            const cookie = await loginAndGetCookie('password');
            const article = await(await fetch('http://localhost:3000/api/article/3', {headers: {cookie}})).json<IArticle>();
            chai.expect(omit(article, 'createdAt', 'updatedAt')).to.deep.equal(omit(article3, 'createdAt', 'updatedAt'));
        }));
        it('should return an error when the requested article doesn\'t exist', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:3000/api/article/5')).json();
            chai.expect(response).to.deep.equal({error: 'No article found'});
        }));
    });

    describe('GET /article', () => {
        it('should return only published articles when not connected', mochaAsync(async () => {
            const articles = await(await fetch('http://localhost:3000/api/article')).json<IArticle[]>();
            chai.expect(articles).to.be.a('array');
            chai.expect(articles).to.have.length(2);
            chai.expect(articles[0].title).to.equal(article1.title);
            chai.expect(articles[1].description).to.equal(article2.description);
        }));

        it('should return all articles when connected', mochaAsync(async () => {
            const cookie = await loginAndGetCookie('password');
            const articles = await(await fetch('http://localhost:3000/api/article', {headers: {cookie}})).json<IArticle[]>();
            chai.expect(articles).to.be.a('array');
            chai.expect(articles).to.have.length(3);
            chai.expect(articles[0].title).to.equal(article1.title);
            chai.expect(articles[1].description).to.equal(article2.description);
            chai.expect(articles[2].content).to.equal(article3.content);
        }));
    });

    describe('POST /article', () => {
        it('should return an error when not connected', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:3000/api/article', {method: 'POST', body: JSON.stringify(article1)})).json();
            chai.expect(response).to.deep.equal({error: 'Cannot save an article when not connected'});
        }));

        it('Should create a new article', mochaAsync(async () => {
            const article = {
                title: 'Hello',
                description: 'This is a description',
                content: 'Hey, the content will be there, you know ?',
                published: false
            };
            const cookie = await loginAndGetCookie('password');
            const response = await fetch('http://localhost:3000/api/article', {
                method: 'POST',
                body: JSON.stringify(article),
                headers: {
                    'Content-Type': 'application/json',
                    cookie
                }
            });
            chai.expect(await response.json()).to.deep.equal({success: true});
        }));
    });

    describe('DELETE /article/:id', () => {
        it('should delete the correct article when connected', mochaAsync(async () => {
            const cookie = await loginAndGetCookie('password');
            const response = await(await fetch('http://localhost:3000/api/article/3', {method: 'DELETE', headers: {cookie}})).json();
            chai.expect(response).to.deep.equal({success: true});
        }));
        it('should return an error when trying to delete when not connected', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:3000/api/article/3', {method: 'DELETE'})).json();
            chai.expect(response).to.deep.equal({error: 'Cannot delete an article when not connected'});
        }));
        it('should return an error when the requested article doesn\'t exist', mochaAsync(async () => {
            const cookie = await loginAndGetCookie('password');
            const response = await(await fetch('http://localhost:3000/api/article/5', {method: 'DELETE', headers: {cookie}})).json();
            chai.expect(response).to.deep.equal({error: 'No article deleted'});
        }));
    });
});
