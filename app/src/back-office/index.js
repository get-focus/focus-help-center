import ReactDOM from 'react-dom';
import './index.scss';

import {HelpCenterBase} from '../common/components/index';
import {ArticleList} from '../common/components/article-list/index';

/** Root component of the back-office app. */
function HelpCenter() {
    return (
        <HelpCenterBase>
            <h3>Back office</h3>
            <ArticleList />
        </HelpCenterBase>
    );
}

ReactDOM.render(<HelpCenter />, document.getElementById('root'));
