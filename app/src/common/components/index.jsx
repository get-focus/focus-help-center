import 'babel-polyfill';
import '../style';
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {i18nInit} from '../i18n';
import {getConfig} from '../server/config';
i18nInit();

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {teal700, blue400, white, grey900} from 'material-ui/styles/colors';
import touch from 'react-tap-event-plugin';
touch();

/** Root common component for both apps. Abstract away the connection to the store. */
export class HelpCenterBase extends React.Component {

    // Loads the config.
    async componentWillMount() {
        const loaded = await getConfig();
        this.setState({loaded});
    }

    render() {
        return (
            <Provider store={configureStore()}>
                <MuiThemeProvider muiTheme={getMuiTheme({
                    palette: {
                        primary1Color: teal700,
                        accent1Color: blue400
                    },
                    floatingActionButton: {
                        secondaryColor: white,
                        secondaryIconColor: grey900
                    },
                    snackbar: {
                        actionColor: white
                    }
                })}>
                    <div className='app'>
                        {this.props.children}
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}
