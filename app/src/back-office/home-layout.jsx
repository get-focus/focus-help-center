import React, {Component} from 'react';
import {connect} from 'react-redux';
import {showSnackBar} from '../common/actions/snack-bar';
import {Snackbar, Paper} from 'material-ui';
import {green500, red500} from 'material-ui/styles/colors';
import {withRouter} from 'react-router';

/** Layout component. */
@withRouter
@connect(state => ({snackBar: state.snackBar}))
export default class HomeLayout extends Component {

    state = {open: false};

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    render() {
        const {children, snackBar: {show, message, timeout, actionText, actionHandler, isError}} = this.props;
        return (
            <div className='home-layout'>
                <header>
                    <div className='top'>
                    </div>
                </header>
                <div className='ribbon'>

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
