import {createStore, applyMiddleware} from 'redux';
import * as thunk from 'redux-thunk';
import {rootReducer} from '../reducers';
import {api} from '../server/api';
import {defaultState} from './default-state';

/** Creates the application store. */
export function configureStore() {
    return createStore(rootReducer, defaultState, applyMiddleware(thunk.default['withExtraArgument'](api)));
}
