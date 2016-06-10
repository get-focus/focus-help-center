// IMPORTS
import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';
import {ContentArea} from './content-area';
import i18n from 'i18next';
import {updateArticle, saveArticle, loadArticleDetail} from '../../actions/article-detail';

@connect(
    state => ({article: state.articleDetail.article}),
    dispatch => (
        {
            updateArticle: (attribute, value) => dispatch(updateArticle(attribute, value)),
            saveArticle: article => dispatch(saveArticle(article)),
            loadArticleDetail: article => dispatch(loadArticleDetail(article))
        })
)
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
        this.props.loadArticleDetail({title: '', description: '', content: ''});
    }

    componentDidMount() {
        // componentHandler.upgradeDom();
    }

    parameterButtonHandler() {
        const {isVisible} = this.state;
        this.setState({isVisible: isVisible ? false : true});
    }

    saveArticle() {
        console.log(this.props.article);
        this.props.saveArticle(this.props.article);
    }

    onChangeHandler(changeOrAttribute, value) {
        const stringChecker = '';
        if (typeof changeOrAttribute === typeof stringChecker) {
            this.props.updateArticle(changeOrAttribute, value);
        } else {
            this.props.updateArticle(changeOrAttribute.target.name, changeOrAttribute.target.value);
        }
    }

    render() {
        const {isVisible} = this.state;
        return (
            <div className='edit-page-container'>
                <div className={`edit-parameters-item${isVisible ? '' : '-hidden'}`} ref='parametersBloc'>
                    <div className='edit-parameters-bloc'>
                        <h5>PARAMÉTRAGE</h5><br/>
                        <span className='edit-parameters-label'>{i18n.t('edit-page.content.section')}</span>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            {i18n.t('button.add')}
                        </div><br/>

                        <div className='mdl-textfield mdl-js-textfield'>
                            <input className='mdl-textfield__input' type='text' id='sectionInput' name='section'/>
                            <label className='mdl-textfield__label' htmlFor='sectionInput'>Rubriques...</label>
                        </div>

                        <br/><br/>
                        <span className='edit-parameters-label'>{i18n.t('edit-page.content.context-url')}</span>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            {i18n.t('button.edit')}
                        </div><br/>

                        <div className='mdl-textfield mdl-js-textfield'>
                            <input className='mdl-textfield__input' type='text' id='urlInput' name='url' />
                            <label className='mdl-textfield__label' htmlFor='urlInput'>URL...</label>
                        </div>

                        <br/><br/>
                        <span className='edit-parameters-label'>{i18n.t('edit-page.content.bloc-information')}</span>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            {i18n.t('button.edit')}
                        </div><br/>

                        <div className='mdl-textfield mdl-js-textfield'>
                            <input className='mdl-textfield__input' type='text' id='blocInformationInput' name='blocInformation' />
                            <label className='mdl-textfield__label' htmlFor='blocInformationInput'>Bloc d'information...</label>
                        </div>

                        <br/><br/>
                            <button
                                className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored edit-button'
                                onClick={this.saveArticle.bind(this)}
                                >
                                {i18n.t('button.save')}
                            </button>
                    </div>
                </div>

                <div className='edit-parameters-button-zone'>
                    <button
                        className='mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect parameters-icon'
                        onClick={this.parameterButtonHandler.bind(this)}
                    >
                        <i className='material-icons'>settings</i>
                    </button><br/><br/>
                    <span className={`edit-parameters-text${isVisible ? '-hidden' : ''}`}>PARAMÉTRAGE</span>
                </div>

                <ContentArea onChange={this.onChangeHandler.bind(this)} value={this.props.article.content} />
            </div>
        );
    }
}
