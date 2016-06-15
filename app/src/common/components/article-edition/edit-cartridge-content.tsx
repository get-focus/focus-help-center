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

    /**
     * Saves the article
     * Checks if the attributes are given to save the article
     */
    saveArticle() {
        const {title, content, description} = this.props.article;
        let data;
        if (title.trim() === '' || content.trim() === '' || description.trim() === '') {
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.failedMessage'),
                timeout: 3000,
                actionHandler: () => { },
                actionText: i18n.t('edit-cartridge.content.snackBar.actionText')
            };
        } else {
            this.props.saveArticle(this.props.article);
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.successMessage'),
                timeout: 3000,
                actionHandler: () => { },
                actionText: i18n.t('edit-cartridge.content.snackBar.actionText')
            };
        }
        this.showSnackBar(data);
    }

    onChangeHandler(changeEvent) {
        this.props.updateArticle(changeEvent.target.name, changeEvent.target.value);
    }

    /**
     * Shows the snackbar with the given information
     */
    showSnackBar = (data) => {
        const {snackBarContainer} = this.refs;
        snackBarContainer['MaterialSnackbar'].showSnackbar(data);
    }

    /**
     * Updates the article 'published' attribute
     * Gives the data for the snackbar
     */
    clickPublishHandler = () => {
        if (this.props.article.published) {
            this.props.updateArticle('published', false);
            this.showSnackBar({
                message: i18n.t('L\'article sera dépublié après la sauvegarde.'),
                timeout: 1500
            });
        } else {
            this.props.updateArticle('published', true);
            this.showSnackBar({
                message: i18n.t('L\'article sera publié après la sauvegarde.'),
                timeout: 1500
            });
        }
    }

    /**
     * Sets the information data to display
     * TODO: traduction for the text
     */
    dateChecker = () => {
        const {updatedAt} = this.props.article;
        const date = new Date(updatedAt);
        const today = new Date();
        const diff = new Date(today.getTime() - date.getTime()).getUTCDate() - 1;
        const month = Math.ceil(diff / 30);
        const year = Math.ceil(month / 12);

        if (diff === 0) {
            return <p>Modifié aujourd'hui</p>;
        } else if (diff > 0) {
            return <p>`Modifié il y a ${diff} jours`</p>;
        } else if (diff > 29) {
            return <p>`Modifié il y a ${month} mois`</p>;
        } else if (month => 12) {
            if (year === 1) {
                return <p>`Modifié il y a ${year} an`</p>;
            } else {
                return <p>`Modifié il y a ${year} ans`</p>;
            }
        }
    }

    render() {
        const {connected} = this.props;
        if (!connected) {
            return <div />;
        }
        return (
            <div>
                <div className='content-flex-cartridge'>
                    <div className='mdl-textfield mdl-js-textfield input-div' ref='inputTitle'>
                        <input className='mdl-textfield__input' type='text' id='titleInput' name='title' onChange={this.onChangeHandler.bind(this) } value={this.props.article.title} />
                        <label className='mdl-textfield__label' htmlFor='titleInput'>{i18n.t('edit-cartridge.input.title') }</label>
                    </div>
                </div>

                <div className='content-flex-cartridge'>
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

                    <span className='publish-label'>
                        {this.props.article.published ? i18n.t('edit-cartridge.content.published') : i18n.t('edit-cartridge.content.toPublish') }
                        {this.dateChecker() }
                    </span>
                    <div id='demo-menu-lower-right'
                        className='mdl-button mdl-js-button mdl-button--icon publish-article'>
                        <i className='material-icons'>keyboard_arrow_down</i>
                    </div>

                    <ul className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'
                        htmlFor='demo-menu-lower-right'>
                        <li className='mdl-menu__item' onClick={this.clickPublishHandler}>
                            {this.props.article.published ? i18n.t('edit-cartridge.content.publish') : i18n.t('edit-cartridge.content.unpublish') }
                        </li>
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
