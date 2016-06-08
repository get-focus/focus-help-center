import ReactDOM from 'react-dom';
import './style/index';

import {HelpCenterBase} from '../common/components/index';
import {Router, hashHistory} from 'react-router';
import routes from './routes';

/** Root component of the back-office app. */
function HelpCenter() {
    return (
        <HelpCenterBase>
            <Router history={hashHistory} routes={routes}/>
        </HelpCenterBase>
    );
}

ReactDOM.render(<HelpCenter />, document.getElementById('root'));
