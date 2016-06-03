import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/index';

/** Creates the application store. */
export function configureStore() {
    return createStore(rootReducer, undefined, applyMiddleware(thunk));
}
