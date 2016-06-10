import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import {configureStore} from '../../store';

export function mountElement(component) {
    return mount(<Provider store={configureStore()}>{component}</Provider>).children();
}

