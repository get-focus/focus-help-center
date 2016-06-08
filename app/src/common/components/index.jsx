import 'babel-polyfill';
import '../style';
import React from 'react';
import 'material-design-lite/material';
window.React = React;

import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {i18nInit} from '../i18n';
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
