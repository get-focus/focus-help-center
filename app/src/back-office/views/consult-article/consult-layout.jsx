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
export default withRouter(
connect(
    state => ({snackBar: state.snackBar})
)(class ConsultLayout extends Component {

    static propTypes = {
        Content: PropTypes.object,
        isSearch: PropTypes.bool
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    };

    state = {open: false};

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    render() {
        const {applicationName, children, Content, snackBar: {show, message, timeout, actionText, actionHandler, isError}, isSearch} = this.props;
        return (
            <div className='consult-layout'>
                <div className='ribbon' style={{backgroundColor: this.context.muiTheme.palette.primary1Color}}>
                    <div className='top'>
                        <div className='left'>
                            <div className='left-top'>
                                <FlatButton hoverColor='transparent' label={i18n.t('back-office.title')} labelStyle={{fontSize: 16}} style={{color: 'white', marginRight: 15}} /> {Content}
                            </div>
                            <div className='app-name'>
                                <FlatButton onClick={() => this.props.router.push('/home') } hoverColor='transparent' label={`${i18n.t('back-office.layout.help')} ${applicationName ? ` ${applicationName}` : ''}`} labelStyle={{fontSize: 20}} style={{color: 'white', flex: '1 1 auto'}} />
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
                    <Paper style={{display: 'flex', flexDirection: 'column', marginBottom: '50px'}} zDepth={1} className='paper'>
                        {isSearch ? <h2 className='search-title' style={{color: this.context.muiTheme.palette.primary1Color}}>résultats</h2> : null}
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
}));
