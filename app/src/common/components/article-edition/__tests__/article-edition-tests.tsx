import {EditPage} from '../index';
import {shallow} from 'enzyme';

describe('Edition Page', () => {
    describe('When the component is displayed', () => {
        let component = shallow(<EditPage />);
        it('Should have an hidden left panel', () => {
            chai.expect(component.find('.edit-parameters-item-hidden')).to.have.length(1);
        });
        it('Should have a visible label on parameter button zone', () => {
            chai.expect(component.find('.edit-parameters-text')).to.have.length(1);
        });
    });
    describe('Blabla', () => {
        let component = shallow(<EditPage />);
        it('Should have an hidden left panel', () => {
            component.find('.parameters-icon').simulate('click');
            chai.expect(component.find('.edit-parameters-item-hidden')).to.have.length(0);
        });
    });
});
