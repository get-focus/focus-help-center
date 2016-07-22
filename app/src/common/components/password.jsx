import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {isConnected, login, logout, clearError} from '../actions/login';
import {loadSectionList} from '../actions/section-list';
import i18n from 'i18next';
import {CircularProgress, IconButton, FlatButton, TextField, Dialog, RaisedButton} from 'material-ui';
import Avatar from 'material-ui/Avatar';

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

    state = {
        dialogOpen: false
    }

    login = () => {
        if (this.props.connected) {
            this.props.logout();
        } else {
            this.props.login(this.refs.input.getValue());
        }
        if (this.state.dialogOpen) {
            this.setState({dialogOpen: !this.state.dialogOpen});
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

    connectClickHandler = () => {
        const {dialogOpen} = this.state;
        this.setState({dialogOpen: !dialogOpen});
    }

    render() {
        const {loading, connected, error, clearError, userName} = this.props;
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
                        <RaisedButton label='connexion' primary={true} onClick={this.connectClickHandler} />
                    }
                    {userName ?
                        <a href='./signout'>
                            <IconButton iconClassName='material-icons'>
                                close
                            </IconButton>
                        </a> : null
                    }
                </div>
                }
                <Dialog
                    title='Connectez-vous'
                    actions={[<RaisedButton label='connexion' primary={true} onClick={this.login} />]}
                    open={this.state.dialogOpen}
                    onRequestClose={this.connectClickHandler}
                    >
                    <div>
                        <span className='ok-text'>{i18n.t('password.password') + ' : '}</span>
                        <TextField name='password' style={{width: '150px', fontSize: '20px'}} type='password' ref='input' />
                    </div>
                </Dialog>
            </div>
        );
    }
}
