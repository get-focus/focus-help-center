import mochaAsync from '../../../test/mocha-async';
import {updateCall} from './update-detail';

describe('Article detail tests', () => {
    it('Should create a new article', mochaAsync(async () => {
        const article = {
            title: 'Hello',
            description: 'This is a description',
            content: 'Hey, the content will be there, you know ?'
        };
        let response = await updateCall(article);
        chai.expect(await response.text()).to.equal('Data sent');
    }));
});
