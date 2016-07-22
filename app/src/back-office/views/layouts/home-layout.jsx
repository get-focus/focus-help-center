import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import i18n from 'i18next';
import {saveArticle} from '../../../common/actions/article-detail';
import {PasswordComponent} from '../../../common/components/password';
import {showSnackBar} from '../../../common/actions/snack-bar';
import {Snackbar, Paper, FlatButton, FloatingActionButton, Dialog, TextField} from 'material-ui';
import {green500, red500} from 'material-ui/styles/colors';
import {withRouter} from 'react-router';
import {appUrl} from '../../../common/server/config';

/** Home-Layout component. */
@withRouter
@connect(
    state => ({
        snackBar: state.snackBar,
        connected: state.login.isConnected
    }),
    dispatch => ({
        saveArticle: (title, description) => dispatch(saveArticle({title, description})),
        showSnackBar: data => dispatch(showSnackBar(data))
    })
)
export default class HomeLayout extends Component {

    static propTypes = {
        Content: PropTypes.object
    };

    state = {open: false};

    togglePopover = (e) => this.setState({open: !this.state.open, anchorEl: e.currentTarget});

    async saveArticle() {
        const title = this.refs.title.getValue();
        const description = this.refs.description.getValue();
        if (title && description) {
            try {
                const id = await this.props.saveArticle(title, description);
                this.props.showSnackBar({
                    message: 'edit-cartridge.content.snackBar.saveSuccessMessage',
                    isError: false
                });
                this.toggleModal();
                setTimeout(() => this.props.router.push(`edit-article/${id}`), 500);
            } catch (e) {
                this.props.showSnackBar({
                    message: 'edit-cartridge.content.snackBar.saveFailedMessage',
                    isError: true
                });
            }
        } else {
            this.props.showSnackBar({
                message: 'edit-cartridge.content.snackBar.saveFailedContentMessage',
                isError: true
            });
        }
    }

    toggleModal() {
        this.setState({open: !this.state.open});
    }

    showFAB() {
        if (this.refs.createFAB.className === 'add-button') {
            this.refs.createFAB.className += ' show';
        } else {
            this.refs.createFAB.className = 'add-button';
        }
    }

    render() {
        const {children, Content, snackBar: {show, message, timeout, actionText, actionHandler, isError}} = this.props;
        const notShowStyle = {transform: 'scale(0)'};
        const showStyle = {transform: 'scale(1)', transition: '0.6 ease-in-out'};
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
                <div className='main'>
                    <Paper style={{minHeight: '55%', maxHeight: '250%', width: '43%', display: 'flex'}} zDepth={1}>
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
                <FloatingActionButton onClick={() => this.toggleModal() } className='add-button' ref='createFAB' style={this.props.connected ? showStyle : notShowStyle}>
                        <i className='material-icons'>add</i>
                    </FloatingActionButton>
                {this.props.connected ? this.showFAB : null}

                <Dialog
                    title={i18n.t('article.create.dialog') }
                    actions={[<FlatButton label={i18n.t('article.create.confirm') } primary={true} onClick={() => this.saveArticle() } />]}
                    open={this.state.open}
                    onRequestClose={() => this.toggleModal() }
                    >
                    <div>
                        <TextField ref='title' hintText={i18n.t('article.title') } />
                        <br />
                        <TextField ref='description' hintText={i18n.t('article.description') } multiLine={true} rows={2} rowsMax={5} />
                    </div>
                </Dialog>
            </div>
        );
    }
}
