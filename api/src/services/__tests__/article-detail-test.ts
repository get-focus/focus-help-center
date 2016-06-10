import mochaAsync from '../../../test/mocha-async';
import {saveCall} from './save-article';

describe('Article detail tests', () => {
    it('Should create a new article', mochaAsync(async () => {
        const article = {
            title: 'Hello',
            description: 'This is a description',
            content: 'Hey, the content will be there, you know ?'
        };
        let response = await saveCall(article);
        chai.expect(await response.text()).to.equal('Data sent');
    }));
});
