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

    describe('GET /section', () => {
        it('should return existing sections with matching name with filter when connected', mochaAsync(async () => {
            const sections = await(await fetchWithLogin('http://localhost:1337/api/section?filter=Tut')).json<ISection[]>();
            chai.expect(sections).to.have.length(1);
            chai.expect(sections[0].name).to.equal(section1.name);
        }));

        it('should return an error when searching a section and not connected', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:1337/api/section?filter=Tut')).json();
            chai.expect(response).to.deep.equal({error: 'Cannot search a section when not connected'});
        }));
    });

    describe('POST /section', () => {
        it('should return an error when not connected', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:1337/api/section', {method: 'POST', body: JSON.stringify(section1)})).json();
            chai.expect(response).to.deep.equal({error: 'Cannot save a section when not connected'});
        }));

        it('should create a new section', mochaAsync(async () => {
            const section = {
                name: 'Drawing'
            };
            const response = await fetchWithLogin('http://localhost:1337/api/section', {
                method: 'POST',
                body: JSON.stringify(section),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const returnedObject = await response.json<ISection>();
            chai.expect(returnedObject.name).to.equal('Drawing');
        }));

        it('should update an existing section', mochaAsync(async () => {
            const section = {
                id: 2,
                name: 'Movies',
            };
            const response = await fetchWithLogin('http://localhost:1337/api/section', {
                method: 'POST',
                body: JSON.stringify(section),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const returnedObject = await response.json<ISection>();
            chai.expect(returnedObject.id).to.equal(2);
            chai.expect(returnedObject.name).to.equal('Movies');
        }));
    });

    describe('DELETE /section/:id', () => {
        it('should delete the correct section when connected', mochaAsync(async () => {
            const response = await(await fetchWithLogin('http://localhost:1337/api/section/1', {method: 'DELETE'})).json();
            chai.expect(response).to.deep.equal({success: true});
        }));
        it('should return an error when trying to delete when not connected', mochaAsync(async () => {
            const response = await(await fetch('http://localhost:1337/api/section/3', {method: 'DELETE'})).json();
            chai.expect(response).to.deep.equal({error: 'Cannot delete a section when not connected'});
        }));
        it('should return an error when the requested section doesn\'t exist', mochaAsync(async () => {
            const response = await(await fetchWithLogin('http://localhost:1337/api/section/5', {method: 'DELETE'})).json();
            chai.expect(response).to.deep.equal({error: 'No section deleted'});
        }));
    });
});
