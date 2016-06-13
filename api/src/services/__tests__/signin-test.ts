import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {login, fetchWithLogin} from './login';

describe('Session', () => {
    it('should sign in and receive a token with correct password', mochaAsync(async () => {
        const response = await login('password');
        chai.expect(await response.json()).to.haveOwnProperty('token');
    }));

    it('should be connected after login with correct password', mochaAsync(async () => {
        const response = await fetchWithLogin('http://localhost:3000/signin');
        chai.expect(await response.json()).to.deep.equal({success: true});
    }));

    it('shouldn\'t sign in with incorrect password', mochaAsync(async () => {
        const response = await login('yolo');
        chai.expect(await response.json()).to.deep.equal({error: 'Incorrect password'});
    }));

    it('shouldn\'t be connected after login in with incorrect password', mochaAsync(async () => {
        const response = await fetch('http://localhost:3000/signin');
        chai.expect(await response.json()).to.deep.equal({success: false});
    }));
});
