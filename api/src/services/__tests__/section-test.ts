import fetch from 'isomorphic-fetch';
import mochaAsync from '../../../test/mocha-async';
import {ISection} from '../../db/section';
import {section1, section2} from '../../db/init-test-data';
import {fetchWithLogin} from './login';

describe('Section', () => {
    describe('GET /section/:id', () => {
        it('should return an error when the requested a section and not connected', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:1337/api/section/1')).json();
            chai.expect(response).to.deep.equal({error: 'You have to be connected'});
        }));
        it('should return the correct section when connected', mochaAsync(async () => {
            const section = await(await fetchWithLogin('http://localhost:1337/api/section/2')).json<ISection>();
            chai.expect(section.name).to.equal(section2.name);
        }));
        it('should return an error when the requested section doesn\'t exist', mochaAsync(async () => {
            const response = await(await fetchWithLogin('http://localhost:1337/api/section/3')).json();
            chai.expect(response).to.deep.equal({error: 'This section doesn\'t exists'});
        }));
    });
});
