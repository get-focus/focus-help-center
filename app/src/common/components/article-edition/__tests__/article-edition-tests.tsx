import {mountElement} from '../../__tests__/util';
import {EditPage} from '../';

describe('Edition Page', () => {
    describe('When the component is displayed', () => {
        let component = mountElement(EditPage);
        it('Should have an hidden left panel', () => {
            chai.expect(component.find('.edit-parameters-item-hidden')).to.have.length(1);
        });
        it('Should have a visible label on parameter button zone', () => {
            chai.expect(component.find('.edit-parameters-text')).to.have.length(1);
        });
    });
    describe('When the settings button is pressed', () => {
        let component = mountElement(EditPage);
        it('Should have an hidden left panel', () => {
            component.find('.parameters-icon').simulate('click');
            chai.expect(component.find('.edit-parameters-item')).to.have.length(1);
        });
        it('Should have a visible label on parameter button zone', () => {
            chai.expect(component.find('.edit-parameters-text-hidden')).to.have.length(1);
        });
    });
});