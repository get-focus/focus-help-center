import 'babel-polyfill';
import React from 'react';
window.React = React;

import {Provider} from 'react-redux';
import {configureStore} from '../store/index';

/** Root common component for both apps. Abstract away the connection to the store. */
export function HelpCenterBase({children}) {
    return (
        <Provider store={configureStore()}>
            <div className='app'>
                {children}
            </div>
        </Provider>
    );
}
