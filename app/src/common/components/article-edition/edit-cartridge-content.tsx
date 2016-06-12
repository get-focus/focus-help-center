import {Component} from 'react';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle, saveArticle, deleteArticle} from '../../actions/article-detail';
import {withRouter} from 'react-router';

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

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    saveArticle() {
        this.props.saveArticle(this.props.article);
        const {snackBarContainer} = this.refs;
        const data = {
            message: i18n.t('edit-cartridge.content.snackBar.message'),
            timeout: 2000,
            actionHandler: function() {
                window.location.href = '';
            },
            actionText: i18n.t('edit-cartridge.content.snackBar.actionText')
        };
        snackBarContainer.MaterialSnackbar.showSnackbar(data);
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
                    <div className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored  article-item-button' onClick={this.titleClickHandler.bind(this) }>
                        <i className='material-icons'>edit</i>
                        {i18n.t('button.edit') }
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
                        {i18n.t('button.edit') }
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
                    <div className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored  article-item-button' onClick={this.descriptionClickHandler.bind(this) }>
                        <i className='material-icons'>edit</i>
                        {i18n.t('button.edit') }
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
                        {i18n.t('button.edit') }
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
                {this.renderTitleZone() }
                {this.renderDescriptionZone() }
                <div className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect' onClick={this.deleteArticle}>
                    <i className='material-icons'>delete </i>
                </div>
                <div className='content-flex-cartridge'>
                    {this.renderTitleZone() }
                </div>
                <div className='content-flex-cartridge'>
                    {this.renderDescriptionZone() }
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored save-article' onClick={this.saveArticle.bind(this) }>
                        {i18n.t('button.save') }
                    </div>
                </div>
                <div id="demo-snackbar-example" className="mdl-js-snackbar mdl-snackbar" ref='snackBarContainer'>
                    <div className="mdl-snackbar__text"></div>
                    <div className="mdl-snackbar__action"></div>
                </div>
            </div>
        );
    }
}

export default withRouter(EditCartridgeContent);
