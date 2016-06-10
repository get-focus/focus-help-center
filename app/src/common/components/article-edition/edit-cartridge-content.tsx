import {Component} from 'react';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle, saveArticle} from '../../actions/article-detail';

@connect(
    state => ({article: state.articleDetail.article}),
    dispatch => (
        {
            updateArticle: (attribute, value) => dispatch(updateArticle(attribute, value)),
            saveArticle: article => dispatch(saveArticle(article))
        })
)
export class EditCartridgeContent extends Component<any, any> {

    state = {
        titleEditable: false,
        descriptionEditable: false
    };

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
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
                <h4 className='edit-cartridge-title' onClick={this.titleClickHandler.bind(this) }>{this.renderLabel('title')}</h4>
            );
        } else {
            return (
                <div>
                    <div className='mdl-textfield mdl-js-textfield edit-cartridge-title'>
                        <input className='mdl-textfield__input edit-cartridge-title' type='text' id='titleInput' name='title' autoFocus onChange={this.onChangeHandler.bind(this)} />
                        <label className='mdl-textfield__label edit-cartridge-title' htmlFor='titleInput'>{i18n.t('edit-cartridge.input.title')}</label>
                    </div>
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect' onClick={this.titleClickHandler.bind(this)}>
                        {i18n.t('button.save')}
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
                <h4 className='edit-cartridge-description' onClick={this.descriptionClickHandler.bind(this) }>{this.renderLabel('description')}</h4>
            );
        } else {
            return (
                <div>
                    <div className='mdl-textfield mdl-js-textfield edit-cartridge-description'>
                        <textarea
                            className='mdl-textfield__input edit-cartridge-description'
                            id='textarea'
                            autoFocus
                            name = 'description'
                            onChange={this.onChangeHandler.bind(this)}
                            />
                        <label
                            className='mdl-textfield__label edit-cartridge-description'
                            htmlFor='textarea'
                            >
                            {i18n.t('edit-cartridge.input.description')}
                        </label>
                    </div>
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-description' onClick={this.descriptionClickHandler.bind(this)}>
                        {i18n.t('button.save')}
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderTitleZone() }
                {this.renderDescriptionZone() }
            </div>
        );
    }
}
