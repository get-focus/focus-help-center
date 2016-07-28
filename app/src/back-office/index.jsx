import React from 'react';
import {render} from 'react-dom';
import './style';

import {HelpCenterBase} from '../common/components';
import {Router, hashHistory} from 'react-router';
import routes from './routes';

/** Root component of the back-office app. */
function HelpCenter() {
    return (
        <HelpCenterBase>
            <Router history={hashHistory} routes={routes} />
        </HelpCenterBase>
    );
}

render(<HelpCenter />, document.getElementById('root'));
