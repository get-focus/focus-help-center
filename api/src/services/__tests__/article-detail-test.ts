import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {updateCall} from './update-detail';
import {IArticle} from '../../db/article';

describe.only('Article detail tests', () => {
    it('should sign in and receive a cookie with correct password', mochaAsync(async () => {
        const article = {
            title: 'Hello',
            description: 'This is a description',
            content: 'Hey, the content will be there, you know ?'
        }
        let response = await updateCall(article);
        chai.expect(await response.text()).to.equal('Data sent');
    }));
});