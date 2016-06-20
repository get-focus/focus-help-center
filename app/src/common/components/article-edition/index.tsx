import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';
import ContentArea from './content-area';
import i18n from 'i18next';
import {loadArticle, clearArticle, showSnackBar} from '../../actions/article-detail';
import {TextField, Snackbar, FlatButton, IconButton} from 'material-ui';
import {State} from '../../store/default-state';

export class EditPage extends Component<any, any> {
    static propTypes = {id: PropTypes.number};

    state = {isVisible: false};

    componentWillMount() {
        this.props.clearArticle();
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        }
    }

    render() {
        if (!this.props.connected) {
            return <div />;
        }

        const {isVisible} = this.state;
        const {message, timeout, actionHandler, actionText} = this.props.snackbarData || {message: '', timeout: 0, actionHandler: undefined, actionText: undefined};
        return (
            <div className='edit-page-container'>
                <div className={`edit-parameters-item${isVisible ? '' : '-hidden'}`} ref='parametersBloc'>
                    <div className='edit-parameters-bloc'>
                        <h5>PARAMÉTRAGE</h5>

                        <div className='edit-parameters-label'>
                            <div>{i18n.t('edit-page.content.section')}</div>
                            <FlatButton label={i18n.t('button.add')} />
                        </div>
                        <TextField hintText='Rubriques' />

                        <div className='edit-parameters-label'>
                            <div>{i18n.t('edit-page.content.context-url')}</div>
                            <FlatButton label={i18n.t('button.edit')} />
                        </div>
                        <TextField hintText='URL...' />

                        <div className='edit-parameters-label'>
                            <div>{i18n.t('edit-page.content.bloc-information')}</div>
                            <FlatButton label={i18n.t('button.edit')} />
                        </div>
                        <TextField hintText={`Bloc d'information...`} />
                    </div>
                </div>

                <div className='edit-parameters-button-zone'>
                    <IconButton
                        className='parameters-icon'
                        onClick={() => this.setState({isVisible: !this.state.isVisible})}
                    >
                        <i className='material-icons'>settings</i>
                    </IconButton>
                    <br />
                    <div className={`edit-parameters-text${isVisible ? '-hidden' : ''}`}>PARAMÉTRAGE</div>
                </div>
                <ContentArea />
                <Snackbar
                    open={this.props.showEditSnackbar}
                    message={message}
                    autoHideDuration={timeout}
                    action={actionText}
                    onActionTouchTap={actionHandler}
                    onRequestClose={() => this.props.showSnackBar()}
                />
            </div>
        );
    }
}

export default connect(
    (state: State) => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected,
        snackbarData: state.articleDetail.snackbarData,
        showEditSnackbar: state.articleDetail.showEditSnackbar,
    }),
    dispatch => ({
        getArticle: id => dispatch(loadArticle(id)),
        clearArticle: () => dispatch(clearArticle()),
        showSnackBar: () => dispatch(showSnackBar())
    })
)(EditPage);
