import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import i18n from 'i18next';
import {PasswordComponent} from '../../../common/components/password';
import {showSnackBar} from '../../../common/actions/snack-bar';
import {Snackbar, Paper, FlatButton} from 'material-ui';
import {green500, red500} from 'material-ui/styles/colors';
import {withRouter} from 'react-router';
import {appUrl} from '../../../common/server/config';

/** Home-Layout component. */
@withRouter
@connect(state => ({snackBar: state.snackBar}))
export default class ConsultLayout extends Component {

    static propTypes = {
        Content: PropTypes.object
    };

    state = {open: false};

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    render() {
        const {applicationName, children, Content, snackBar: {show, message, timeout, actionText, actionHandler, isError}} = this.props;
        return (
            <div className='consult-layout'>
                <div className='ribbon'>
                    <div className='top'>
                        <div className='left'>
                            <div className='left-top'>
                                <FlatButton hoverColor='transparent' label={'Centre d\'aide'} labelStyle={{fontSize: 16}} style={{color: 'white', marginRight: 15}} /> {Content}
                            </div>
                            <div className='app-name'>
                                <FlatButton onClick={() => this.props.router.push('/home') } hoverColor='transparent' label={`Aide${applicationName ? ` ${applicationName}` : ''}`} labelStyle={{fontSize: 20}} style={{color: 'white', flex: '1 1 auto'}} />
                            </div>
                        </div>
                        <div className='middle'>
                        </div>
                        <div className='right'>
                            <div className='right-container'>
                                <a className='button-link' href={appUrl} target='_blank'>
                                    <FlatButton
                                        icon={<i className='material-icons'>exit_to_app</i>}
                                        label={i18n.t('back-office.layout.back-to-app') }
                                        labelPosition='before'
                                        style={{color: 'white'}}
                                        />
                                </a>
                                <PasswordComponent generalColor='white'/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card'>
                    <Paper style={{minHeight: '75%', width: '54%', display: 'flex', marginBottom: '50px'}} zDepth={1}>
                        {children}
                    </Paper>
                </div>
                <Snackbar
                    open={show}
                    message={message}
                    autoHideDuration={timeout}
                    action={actionText}
                    onActionTouchTap={actionHandler}
                    onRequestClose={() => this.props.dispatch(showSnackBar()) }
                    bodyStyle={{backgroundColor: isError ? red500 : green500}}
                    />
            </div>
        );
    }
}
