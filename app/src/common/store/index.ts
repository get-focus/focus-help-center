import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/index';
import {api} from '../server/api';

/** Creates the application store. */
export function configureStore() {
    return createStore(rootReducer, undefined, applyMiddleware(thunk['withExtraArgument'](api)));
}
