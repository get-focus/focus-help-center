import {loadSectionList} from '../section-list';
import {Action} from '../../actions';
import {apiMockData} from '../../server/api-mock';

describe.only('Action Section List', () => {
    describe('loadSectionList', () => {
        it('should dispatch request then receive actions', done => {
            chai.expect(loadSectionList()).to.dispatch.actions([{
                type: Action.REQUEST_SECTION_LIST
            }, {
                type: Action.SUCCESS_SECTION_LIST,
                list: apiMockData.loadSectionList
            }], done);
        });
    });
});
