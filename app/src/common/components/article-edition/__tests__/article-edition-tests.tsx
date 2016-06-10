import {EditPage} from '../';
import {shallow} from 'enzyme';
import {Provider} from 'react-redux';
import {configureStore} from '../../../store';

describe('Edition Page', () => {
    describe('When the component is displayed', () => {
        let component = shallow(<Provider store={configureStore()}><EditPage /></Provider>);
        it('Should have an hidden left panel', () => {
            chai.expect(component.find('.edit-parameters-item-hidden')).to.have.length(1);
        });
        it('Should have a visible label on parameter button zone', () => {
            chai.expect(component.find('.edit-parameters-text')).to.have.length(1);
        });
    });
    describe.skip('When the settings button is pressed', () => {
        let component = shallow(<Provider store={configureStore()}><EditPage /></Provider>);
        it('Should have an hidden left panel', () => {
            component.find('.parameters-icon').simulate('click');
            chai.expect(component.find('.edit-parameters-item')).to.have.length(1);
        });
        it('Should have a visible label on parameter button zone', () => {
            chai.expect(component.find('.edit-parameters-text-hidden')).to.have.length(1);
        });
    });
});
