import {clearSection, loadSection} from '../section-detail';
import {section1} from '../../server/api-mock';
import {Action} from '../../actions';

describe('Section Detail Actions', () => {
    describe('clearSection', () => {
        it('should dispatch request then success actions', done => {
            chai.expect(clearSection()).to.dispatch.actions([
                {type: Action.CLEAR_SECTION},
            ], done);
        });
    });

    describe('loadSection', () => {
        it('should dispatch request then success actions', done => {
            chai.expect(loadSection(1)).to.dispatch.actions([
                {type: Action.REQUEST_ACTION_SECTION},
                {
                    type: Action.SUCCESS_LOAD_SECTION,
                    section: section1
                }
            ], done);
        });
    });
});
