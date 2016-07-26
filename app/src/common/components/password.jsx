import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {isConnected, login, logout, clearError} from '../actions/login';
import {loadSectionList} from '../actions/section-list';
import i18n from 'i18next';
import {CircularProgress, IconButton, FlatButton, TextField, Dialog, RaisedButton, IconMenu, MenuItem, FontIcon} from 'material-ui';

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

    keyDownHandler = (e) => {
        if (e.keyCode === 13 ) {
            this.login();
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
        this.setState({dialogOpen: !dialogOpen}, () => { if (this.state.dialogOpen) { this.refs.input.focus(); } });
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
                                <IconMenu
                                    iconButtonElement={<FontIcon color={generalColor} style={{cursor: 'pointer', fontSize: '30px'}} className='material-icons'>account_circle</FontIcon>}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    >
                                    <MenuItem primaryText="Déconnexion" onClick={this.login} />
                                </IconMenu>
                                :
                                <RaisedButton label='connexion' primary={true} onClick={this.connectClickHandler} style={{borderRadius: '5px'}} />
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
                    title={'Connectez-vous en tant qu\'administrateur'}
                    actions={[<RaisedButton label='connexion' primary={true} onClick={this.login} />]}
                    open={this.state.dialogOpen}
                    onRequestClose={this.connectClickHandler}
                    ref='dialog'
                    >
                    <div>
                        <span className='ok-text'>{i18n.t('password.password') + ' : '}</span>
                        <TextField name='password' style={{width: '150px', fontSize: '20px'}} type='password' ref='input' onKeyDown={(e) => this.keyDownHandler(e)} />
                    </div>
                </Dialog>
            </div>
        );
    }
}
