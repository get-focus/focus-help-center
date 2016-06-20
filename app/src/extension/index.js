import ReactDOM from 'react-dom';

import {HelpCenterBase} from '../common/components';
import {Layout} from './views/layout/';

function Extension() {
    return (
        <HelpCenterBase>
            <Layout />
        </HelpCenterBase>
    );
}

ReactDOM.render(<Extension />, document.getElementById('root'));
