import ReactDOM from 'react-dom';
import './index.scss';

import {HelpCenterBase} from '../common/components/index';
import {ArticleList} from '../common/components/article/list';
import {Router, browserHistory} from 'react-router';
import routes from './routes';

/** Root component of the back-office app. */
function HelpCenter() {
    return (
        <HelpCenterBase>
            <Router history={browserHistory} routes={routes}/>
        </HelpCenterBase>
    );
}

ReactDOM.render(<HelpCenter />, document.getElementById('root'));
