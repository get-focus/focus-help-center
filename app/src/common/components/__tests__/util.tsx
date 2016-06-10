import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {configureStore} from '../../store';

export function mountElement(EditPage) {
    return mount(<Provider store={configureStore()}><EditPage /></Provider>).children();
}

