import {createStore, applyMiddleware} from 'redux';
import * as thunk from 'redux-thunk';
import {rootReducer} from '../reducers';
import {api} from '../server/api';

/** Creates the application store. */
export function configureStore() {
    return createStore(rootReducer, undefined, applyMiddleware(thunk.default['withExtraArgument'](api)));
}
