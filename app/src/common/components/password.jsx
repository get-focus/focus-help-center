import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {isConnected, login, logout, clearError} from '../actions/login';
import {loadSectionList} from '../actions/section-list';
import i18n from 'i18next';
import {CircularProgress, IconButton, FlatButton, TextField} from 'material-ui';

@connect(
    state => ({
        loading: state.login.isLoading,
        connected: state.login.isConnected,
        error: state.login.error,
        userName: state.login.userName
    }),
    dispatch => ({
        isConnected: () => dispatch(isConnected()),
        loadSectionList: () => dispatch(loadSectionList()),
        login: password => dispatch(login(password)),
        logout: () => dispatch(logout()),
        clearError: () => dispatch(clearError())
    })
)
export class PasswordComponent extends React.Component {

    static defaultProps = {
        generalColor: 'black'
    }

    static propTypes = {
        generalColor: PropTypes.string
    }

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

    componentDidUpdate() {
        this.props.loadSectionList();
    }

    render() {
        const {loading, connected, error, clearError, userName, generalColor} = this.props;
        return (
            <div className='password-bar'>
                {loading ? <CircularProgress size={0.4} style={{position: 'fixed', right: '0px'}} /> : null}
                {error ?
                    <FlatButton label={error} onClick={clearError} icon={<i className="material-icons">error</i>} />
                : <div className='ok'>
                    {userName ?
                        <span>{userName}{connected ? ' [ADMIN]' : ''}</span>
                    : connected ?
                        <FlatButton style={{color: 'white'}} label={i18n.t('password.connected')} labelPosition='before' onClick={this.login} icon={<i className="material-icons">close</i>} />
                        :
                        <div>
                            <span className='ok-text'>{i18n.t('password.password') + ' : '}</span>
                            <TextField name='password' inputStyle={{color: generalColor}} style={{width: '150px', fontSize: '20px'}} type='password' ref='input' />
                        </div>
                    }
                    {userName ?
                        <a href='./signout'>
                            <IconButton iconClassName='material-icons'>
                                close
                            </IconButton>
                        </a>
                    :
                    !connected ?
                        <IconButton onClick={this.login} iconClassName='material-icons' iconStyle={{color: generalColor}}>
                            arrow_forward
                        </IconButton>
                        : null
                    }
                </div>
                }
            </div>
        );
    }
}
