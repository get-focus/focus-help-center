import {Component, PropTypes} from 'react';
import Markdown from 'remarkable';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {saveArticle} from '../../actions/article-detail';
import {Link} from 'react-router';


@connect(
    state => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected
    }),
    dispatch => ({
        saveArticle: article => dispatch(saveArticle(article))
    })
)
export class ContentArea extends Component<any, any> {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    md = new Markdown();
    handleChange = () => {
        const value = this.refs['textarea']['value'];
        this.props.onChange('content', value);
    }
    rawMarkup = () => ({ __html: this.md.render(this.props.value) });

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    /**
     * Shows the snackbar with the given information
     */
    showSnackBar = (data) => {
        const {snackBarContainer} = this.refs;
        snackBarContainer['MaterialSnackbar'].showSnackbar(data);
    }

    /**
     * Saves the article
     * Checks if the attributes are given to save the article
     */
    saveArticle() {
        const {title, content, description} = this.props.article;
        let data;
        if (title === undefined || content === undefined || description  === undefined) {
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.saveFailedMessage'),
                timeout: 3000,
                actionHandler: () => {this.props.router.push({ path: 'home' }); },
                actionText: i18n.t('edit-cartridge.content.snackBar.saveActionText')
            };
        } else {
            this.props.saveArticle(this.props.article);
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.saveSuccessMessage'),
                timeout: 3000,
                actionHandler: () => {this.props.router.push({ path: 'home' }); },
                actionText: i18n.t('edit-cartridge.content.snackBar.saveActionText')
            };
        }
        this.showSnackBar(data);
    }

    render() {
        return (
            <div className='content-edit'>
                <div className='header-edit'>
                    <div className='header-item-edit'>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored save-button' onClick={this.saveArticle.bind(this)}>
                            {i18n.t('button.save') }
                        </div>
                    </div>
                    <div className='header-item-preview'>
                        <p>{i18n.t('content-area.preview') }</p>
                    </div>
                </div>
                <div className='content-area'>
                    <div className='mdl-textfield mdl-js-textfield content-area-textarea'>
                        <textarea
                            ref='textarea'
                            className='mdl-textfield__input'
                            value={this.props.value}
                            onChange={this.handleChange}
                            id='textarea'
                            />
                        <label
                            className='mdl-textfield__label'
                            htmlFor='textarea'
                            >
                            {i18n.t('article-edit.content.placeholder') }
                        </label>
                    </div>
                    <div
                        className='content-area-display'
                        dangerouslySetInnerHTML={this.rawMarkup() }
                        ref='test'
                        />
                </div>
                <div id='demo-snackbar-example' className='mdl-js-snackbar mdl-snackbar' ref='snackBarContainer'>
                    <div className='mdl-snackbar__text'></div>
                    <Link className='mdl-snackbar__action' to='/'></Link>
                </div>
            </div>
        );
    }
}