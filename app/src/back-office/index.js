import React from 'react';
import ReactDOM from 'react-dom';
import {HelpCenterBase} from '../common/components/index';

function HelpCenter() {
    return (
        <HelpCenterBase>
            <h1>Back office</h1>
        </HelpCenterBase>
    );
}

window.React = React;
ReactDOM.render(<HelpCenter />, document.getElementById('root'));
