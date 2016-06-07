import 'babel-polyfill';
import '../style/index';
import React from 'react';
window.React = React;

import {Provider} from 'react-redux';
import {configureStore} from '../store/index';
import {i18nInit} from '../i18n/index';
i18nInit();

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
