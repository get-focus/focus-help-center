import 'babel-polyfill';
import '../style';
import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {i18nInit} from '../i18n';
import {getConfig, primaryColor, primaryColorDark, primaryColorLight, accentColor} from '../server/config';
i18nInit();

import {MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {blue50, blue500, blue700, pink400, white} from 'material-ui/styles/colors';
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
        const {loaded} = this.state || {};
        return (
            <div>
                {!loaded ? <div/>
                    :
                    <MuiThemeProvider muiTheme={getMuiTheme({
                        palette: {
                            primary1Color: primaryColor || blue500,
                            primary2Color: primaryColorLight || blue50,
                            primary3Color: primaryColorDark || blue700,
                            accent1Color: accentColor || pink400
                        },
                        floatingActionButton: {
                            secondaryColor: accentColor || pink400
                        },
                        snackbar: {
                            actionColor: white
                        }
                    })}>
                        <Provider store={configureStore()}>
                            <div className='app'>
                                {this.props.children}
                            </div>
                        </Provider>
                    </MuiThemeProvider>
                }
            </div>
        );
    }
}
