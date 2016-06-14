import {Component} from 'react';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle, saveArticle, deleteArticle} from '../../actions/article-detail';
import {withRouter} from 'react-router';
import {Link} from 'react-router';

@connect(
    state => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected
    }),
    dispatch => ({
        updateArticle: (attribute, value) => dispatch(updateArticle(attribute, value)),
        saveArticle: article => dispatch(saveArticle(article)),
        deleteArticle: id => dispatch(deleteArticle(id))
    })
)
class EditCartridgeContent extends Component<any, any> {

    state = {
        titleEditable: false,
        descriptionEditable: false
    };

    deleteArticle = () => {
        this.props.deleteArticle(this.props.article.id);
        this.props.router.push({ path: 'home' });
    };

    showPopup = () => {
        const {modal} = this.refs;
        modal['style'].display = 'block';
    }

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
        const {inputTitle, inputDescription} = this.refs;
        inputTitle['MaterialTextfield'].change(this.props.article.title);
        inputDescription['MaterialTextfield'].change(this.props.article.description);
    }

    saveArticle() {
        const title = this.props.article.title;
        const content = this.props.article.content;
        const description = this.props.article.description;
        let data;
        const {snackBarContainer} = this.refs;

        if (title.trim() === '' || content.trim() === '' || description.trim() === '') {
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.failedMessage'),
                timeout: 2000,
                actionHandler: () => { },
                actionText: i18n.t('edit-cartridge.content.snackBar.actionText')
            };
        } else {
            this.props.saveArticle(this.props.article);
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.successMessage'),
                timeout: 2000,
                actionHandler: () => { },
                actionText: i18n.t('edit-cartridge.content.snackBar.actionText')
            };
        }
        snackBarContainer['MaterialSnackbar'].showSnackbar(data);
    }

    onChangeHandler(changeEvent) {
        this.props.updateArticle(changeEvent.target.name, changeEvent.target.value);
    }

    render() {
        const {connected} = this.props;
        if (!connected) {
            return <div />;
        }

        return (
            <div>
                <div>
                    <span className='label-title'>{i18n.t('edit-cartridge.content.title') }</span>
                    <div className='mdl-textfield mdl-js-textfield input-div' ref='inputTitle'>
                        <input className='mdl-textfield__input' type='text' id='titleInput' name='title' onChange={this.onChangeHandler.bind(this) } value={this.props.article.title} />
                        <label className='mdl-textfield__label' htmlFor='titleInput'>{i18n.t('edit-cartridge.input.title') }</label>
                    </div>
                </div>

                <div className='content-flex-cartridge'>
                    <span className='label-description'>{i18n.t('edit-cartridge.content.description') }</span>
                    <div className='input-div-parent'>
                        <div className='mdl-textfield mdl-js-textfield input-div-area' ref='inputDescription'>
                            <textarea
                                className='mdl-textfield__input'
                                id='textarea'
                                name = 'description'
                                onChange={this.onChangeHandler.bind(this) }
                                value={this.props.article.description}
                                />
                            <label
                                className='mdl-textfield__label'
                                htmlFor='textarea'
                                >
                                {i18n.t('edit-cartridge.input.description') }
                            </label>
                        </div>
                    </div>
                    <button id='demo-menu-lower-right'
                        className='mdl-button mdl-js-button mdl-button--icon'>
                        <i className='material-icons'>keyboard_arrow_down</i>
                    </button>

                    <ul className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'
                        htmlFor='demo-menu-lower-right'>
                        <li className='mdl-menu__item'>Publier</li>
                        <li className='mdl-menu__item'>Dépublier</li>
                    </ul>

                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored save-article' onClick={this.saveArticle.bind(this) }>
                        {i18n.t('button.save') }
                    </div>
                    <div className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect delete-article' onClick={this.showPopup}>
                        <i className='material-icons'>delete </i>
                    </div>
                </div>

                <div id='demo-snackbar-example' className='mdl-js-snackbar mdl-snackbar' ref='snackBarContainer'>
                    <div className='mdl-snackbar__text'></div>
                    <Link className='mdl-snackbar__action' to='/'></Link>
                </div>

                <div id='myModal' className='modal' ref='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => this.refs['modal']['style'].display = 'none'}>×</span>
                        <div className='confirm-popup'>
                            <div className='popup-content'>
                                <p>{i18n.t('edit-cartridge.content.popup.confirmMessage') }</p>
                                <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored' onClick={() => this.deleteArticle() }>
                                    {i18n.t('edit-cartridge.content.popup.confirm') }
                                </div>
                                <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored' onClick={() => this.refs['modal']['style'].display = 'none' }>
                                    {i18n.t('edit-cartridge.content.popup.cancel') }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditCartridgeContent);
