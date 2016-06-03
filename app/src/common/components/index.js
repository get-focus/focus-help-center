import {Provider} from 'react-redux';
import {configureStore} from '../store/index';

export function HelpCenterBase({children}) {
    return (
        <Provider store={configureStore()}>
            {children}
        </Provider>
    );
}
