import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';
import ContentArea from './content-area';
import i18n from 'i18next';
import {updateArticle, loadArticle, clearArticle, showSnackBar} from '../../actions/article-detail';
import {TextField, Snackbar, FlatButton, IconButton} from 'material-ui';

export class EditPage extends Component<any, any> {

    static propTypes = {
        article: PropTypes.object,
        updateArticle: PropTypes.func,
        saveArticle: PropTypes.func
    };

    state = {
        isVisible: false
    };

    componentWillMount() {
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        } else {
            this.props.clearArticle();
        }
    }

    parameterButtonHandler() {
        const {isVisible} = this.state;
        this.setState({isVisible: isVisible ? false : true});
    }

    onChangeHandler(attribute, value?) {
        this.props.updateArticle(attribute, value || this.refs[attribute]);
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

                        <div className='edit-parameters-label'>{i18n.t('edit-page.content.section')}</div>
                        <FlatButton style={{float: 'right'}} label={i18n.t('button.add')} />
                        <TextField hintText='Rubriques' />

                        <div className='edit-parameters-label'>{i18n.t('edit-page.content.context-url')}</div>
                        <FlatButton style={{float: 'right'}} label={i18n.t('button.edit')} />
                        <TextField hintText='URL...' />

                        <div className='edit-parameters-label'>{i18n.t('edit-page.content.bloc-information')}</div>
                        <FlatButton style={{float: 'right'}} label={i18n.t('button.edit')} />
                        <TextField hintText={`Bloc d'information...`} />
                    </div>
                </div>

                <div className='edit-parameters-button-zone'>
                    <IconButton
                        className='parameters-icon'
                        onClick={() => this.parameterButtonHandler()}
                    >
                        <i className='material-icons'>settings</i>
                    </IconButton>
                    <br />
                    <div className={`edit-parameters-text${isVisible ? '-hidden' : ''}`}>PARAMÉTRAGE</div>
                </div>

                <ContentArea onChange={this.onChangeHandler.bind(this)} value={this.props.article.content} />
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
    state => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected,
        snackbarData: state.articleDetail.snackbarData,
        showEditSnackbar: state.articleDetail.showEditSnackbar,
    }),
    dispatch => ({
        updateArticle: (attribute, value) => dispatch(updateArticle(attribute, value)),
        getArticle: id => dispatch(loadArticle(id)),
        clearArticle: () => dispatch(clearArticle()),
        showSnackBar: () => dispatch(showSnackBar())
    })
)(EditPage);
