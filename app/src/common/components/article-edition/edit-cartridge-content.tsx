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
        deleteArticle: (id, article) => dispatch(deleteArticle(id, article))
    })
)
class EditCartridgeContent extends Component<any, any> {

    state = {
        titleEditable: false,
        descriptionEditable: false
    };

    deleteArticle = () => {

        const {modal} = this.refs;
        modal.style.display = 'block';

        // this.props.deleteArticle(this.props.article.id, { title: '', description: '', content: '' });
        // this.props.router.push({ path: 'home' });
    };

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
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

    // Changes the title editable state
    titleClickHandler() {
        const {titleEditable} = this.state;
        this.setState({ titleEditable: !titleEditable ? true : false });
    }

    onChangeHandler(changeEvent) {
        this.props.updateArticle(changeEvent.target.name, changeEvent.target.value);
    }

    renderLabel(attribute) {
        const {article} = this.props;
        if (article[`${attribute}`] === '' || article[`${attribute}`] === undefined) {
            return i18n.t(`edit-cartridge.content.${attribute}`);
        } else {
            return article[`${attribute}`];
        }
    }

    // Display the title zone
    renderTitleZone() {
        const {titleEditable} = this.state;
        if (!titleEditable) {
            return (
                <h4 className='edit-cartridge-title'>{this.renderLabel('title') }
                    <div className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect article-item-button' onClick={this.titleClickHandler.bind(this) }>
                        <i className='material-icons'>edit </i>
                    </div>
                </h4>
            );
        } else {
            return (
                <div>
                    <div className='mdl-textfield mdl-js-textfield input-div'>
                        <input className='mdl-textfield__input' type='text' id='titleInput' name='title' autoFocus onChange={this.onChangeHandler.bind(this) } />
                        <label className='mdl-textfield__label' htmlFor='titleInput'>{i18n.t('edit-cartridge.input.title') }</label>
                    </div>
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-title' onClick={this.titleClickHandler.bind(this) }>
                        {i18n.t('button.save') }
                    </div>
                </div>
            );
        }
    }

    // Changes the desicription editable state
    descriptionClickHandler() {
        const {descriptionEditable} = this.state;
        this.setState({ descriptionEditable: !descriptionEditable ? true : false });
    }

    // Display the title zone
    renderDescriptionZone() {
        const {descriptionEditable} = this.state;
        if (!descriptionEditable) {
            return (
                <h5 className='edit-cartridge-description'>
                    <em>{this.renderLabel('description') }</em>
                    <div className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect article-item-button' onClick={this.descriptionClickHandler.bind(this) }>
                        <i className='material-icons'>edit </i>
                    </div>
                </h5>
            );
        } else {
            return (
                <div className='input-div-parent'>
                    <div className='mdl-textfield mdl-js-textfield input-div-area'>
                        <textarea
                            className='mdl-textfield__input'
                            id='textarea'
                            autoFocus
                            name = 'description'
                            onChange={this.onChangeHandler.bind(this) }
                            />
                        <label
                            className='mdl-textfield__label'
                            htmlFor='textarea'
                            >
                            {i18n.t('edit-cartridge.input.description') }
                        </label>
                    </div>
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-description' onClick={this.descriptionClickHandler.bind(this) }>
                        {i18n.t('button.save') }
                    </div>
                </div>
            );
        }
    };

    render() {
        const {connected} = this.props;
        if (!connected) {
            return <div />;
        }

        return (
            <div>
                <div className='content-flex-cartridge'>
                    {this.renderTitleZone() }
                </div>
                <div className='content-flex-cartridge'>
                    {this.renderDescriptionZone() }
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored save-article' onClick={this.saveArticle.bind(this) }>
                        {i18n.t('button.save') }
                    </div>
                    <div className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect delete-article' onClick={this.deleteArticle}>
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
                        <center>
                            <p>Voulez-vous vraiment supprimer cet article?</p>
                            <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored' onClick={() => console.log('hello') }>
                                Oui
                            </div>
                            <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored' onClick={() => console.log('hello') }>
                                Non
                            </div>
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditCartridgeContent);
