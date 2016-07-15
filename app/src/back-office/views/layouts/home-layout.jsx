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
export default class HomeLayout extends Component {

    static propTypes = {
        Content: PropTypes.object
    };

    state = {open: false};

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    render() {
        const {children, Content, snackBar: {show, message, timeout, actionText, actionHandler, isError}} = this.props;
        return (
            <div className='home-layout'>
                <div className='ribbon'>
                    <div className='top'>
                        <div className='left'>
                            {Content}
                        </div>
                        <div className='middle'>
                        </div>
                        <div className='right'>
                            <PasswordComponent generalColor='white'/>
                            <a className='button-link' href={appUrl} target='_blank'>
                                <FlatButton
                                    icon={<i className='material-icons'>exit_to_app</i>}
                                    label={i18n.t('back-office.layout.back-to-app') }
                                    labelPosition='before'
                                    style={{color: 'white'}}
                                    />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='main'>
                    <Paper style={{minHeight: '75%', maxHeight: '75%', width: '54%', display: 'flex'}} zDepth={1}>
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
