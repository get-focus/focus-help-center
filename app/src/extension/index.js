import ReactDOM from 'react-dom';
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

ReactDOM.render(<Extension />, document.getElementById('root'));
