import React, {Component, PropTypes} from 'react';
import i18n from 'i18next';
import {PasswordComponent} from '../common/components/password';
import {connect} from 'react-redux';
import {showSnackBar} from '../common/actions/snack-bar';
import {FlatButton, FloatingActionButton, Popover, Menu, MenuItem, Snackbar} from 'material-ui';
import {green500, red500} from 'material-ui/styles/colors';

/** Layout component. */
@connect(state => ({snackBar: state.snackBar}))
export default class Layout extends Component {

    static propTypes = {
        BarMiddle: PropTypes.node,
        Content: PropTypes.object,
        actions: PropTypes.object
    };

    state = {open: false};

    checkActions = () => {
        const {actions} = this.props;
        if (actions !== undefined && actions.secondary !== undefined && actions.secondary.length > 0) {
            return true;
        }
    };

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    render() {
        const {children, BarMiddle, Content, actions, snackBar: {show, message, timeout, actionText, actionHandler, isError}} = this.props;
        return (
            <div className='layout'>
                <header>
                    <div className='top'>
                        <div className='left'>
                            <FlatButton
                                icon={<i className='material-icons'>exit_to_app</i>}
                                label={i18n.t('back-office.layout.back-to-app')}
                                onClick={() => window.open(process.env.ENV === 'development' ? 'http://localhost:3000' : 'https://github.com/get-focus/focus-help-center')}
                            />
                        </div>
                        <div className='middle'>
                            {BarMiddle}
                        </div>
                        <div className='right'>
                            <PasswordComponent />
                        </div>
                    </div>
                    {Content}
                    <div className='actions'>
                        {actions && actions.primary.map(({clickHandler, icon, action}, i) => (
                            <FloatingActionButton
                                secondary={true}
                                key={i}
                                onClick={action ? () => this.props.dispatch(action) : clickHandler}
                                style={{margin: '0 3px'}}
                            >
                                <i className="material-icons">{icon}</i>
                            </FloatingActionButton>
                        ))}
                        {actions && actions.secondary !== undefined ?
                            <FloatingActionButton
                                secondary={true}
                                onClick={this.togglePopover}
                                style={{margin: '0 3px'}}
                            >
                                <i className="material-icons">more_vert</i>
                            </FloatingActionButton>
                        : null}
                        {this.checkActions() ?
                            <Popover
                                open={this.state.open}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={this.togglePopover}
                            >
                                <Menu>
                                    {actions.secondary.map(({action, clickHandler, label}, i) => (
                                        <MenuItem
                                            key={i}
                                            primaryText={label}
                                            onClick={action ? () => this.props.dispatch(action) : clickHandler}
                                        />
                                    ))}
                                </Menu>
                            </Popover>
                        : null}
                    </div>
                </header>
                <div className='content'>
                    {children}
                </div>
                <Snackbar
                    open={show}
                    message={message}
                    autoHideDuration={timeout}
                    action={actionText}
                    onActionTouchTap={actionHandler}
                    onRequestClose={() => this.props.dispatch(showSnackBar())}
                    bodyStyle={{backgroundColor: isError ? red500 : green500}}
                />
            </div>
        );
    }
}
