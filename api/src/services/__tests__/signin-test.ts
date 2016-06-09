import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {login, loginAndGetCookie} from './login';

describe('Session', () => {
    it('should sign in and receive a cookie with correct password', mochaAsync(async () => {
        const response = await login('password');
        chai.expect(response.status).to.equal(200);
        chai.expect(response.headers.getAll('set-cookie')).is.not.empty;
        chai.expect(await response.json()).to.deep.equal({success: true});
    }));

    it('should be connected after login with correct password', mochaAsync(async () => {
        const cookie = await loginAndGetCookie('password');
        const response = await fetch('http://localhost:3000/signin', {headers: {cookie}});
        chai.expect(await response.json()).to.deep.equal({success: true});
    }));

    it('shouldn\'t sign in with incorrect password', mochaAsync(async () => {
        const response = await login('yolo');
        chai.expect(response.status).to.equal(403);
        chai.expect(await response.json()).to.deep.equal({error: 'Incorrect password'});
    }));

    it('shouldn\'t be connected after login in with incorrect password', mochaAsync(async () => {
        const cookie = await loginAndGetCookie('yolo');
        const response = await fetch('http://localhost:3000/signin', {headers: {cookie}});
        chai.expect(await response.json()).to.deep.equal({success: false});
    }));
});
