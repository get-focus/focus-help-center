import React from 'react';
import {connect} from 'react-redux';
import {isConnected, login, logout, clearError} from '../actions/login';
import i18n from 'i18next';
import {CircularProgress, IconButton, FlatButton, TextField} from 'material-ui';

@connect(
    state => ({
        loading: state.login.isLoading,
        connected: state.login.isConnected,
        error: state.login.error
    }),
    dispatch => ({
        isConnected: () => dispatch(isConnected()),
        login: password => dispatch(login(password)),
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError())
    })
)
export class PasswordComponent extends React.Component {

    login = () => {
        if (this.props.connected) {
            this.props.logout();
        } else {
            this.props.login(this.refs.input.getValue());
        }
    }

    componentWillMount() {
        const {isConnected, connected} = this.props;
        if (!connected) {
            isConnected();
        }
    }

    render() {
        const {loading, connected, error, clearError} = this.props;
        return (
            <div className='password-bar'>
                {loading ? <CircularProgress size={0.4} style={{position: 'fixed', right: '0px'}} /> : null}
                {error ?
                    <FlatButton label={error} onClick={clearError} icon={<i className="material-icons">error</i>} />
                : <div className='ok'>
                    {connected ?
                        <strong>{i18n.t('password.connected')}</strong>
                        :
                        <div>
                            <span className='ok-text'>{i18n.t('password.password') + ' : '}</span>
                            <TextField name='password' style={{width: '150px', fontSize: '20px'}} type='password' ref='input' />
                        </div>
                    }
                    <IconButton onClick={this.login} iconClassName='material-icons'>
                        {connected ? 'close' : 'arrow_forward'}
                    </IconButton>
                </div>
                }
            </div>
        );
    }
}
