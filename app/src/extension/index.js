import React from 'react';
import {render} from 'react-dom';
import {HelpCenterBase} from '../common/components';
import './style';
import {Router, hashHistory} from 'react-router';
import routes from './routes';

function Extension() {
    return (
        <HelpCenterBase>
            <Router history={hashHistory} routes={routes} />
        </HelpCenterBase>
    );
}

render(<Extension />, document.getElementById('root'));
