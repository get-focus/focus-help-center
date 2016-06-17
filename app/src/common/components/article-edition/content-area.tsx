import {Component, PropTypes} from 'react';
import Markdown from 'remarkable';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {saveArticle, showSnackBar} from '../../actions/article-detail';
import {withRouter} from 'react-router';
import {RaisedButton, TextField} from 'material-ui';

@connect(
    state => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected,
        snackbarData: state.articleDetail.snackbarData,
        showEditSnackbar: state.articleDetail.showEditSnackbar,
    }),
    dispatch => ({
        saveArticle: article => dispatch(saveArticle(article)),
        showSnackBar: (snackbarData) => dispatch(showSnackBar(snackbarData))
    })
)
class ContentArea extends Component<any, any> {
    static propTypes: any = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    md = new Markdown();
    handleChange = () => {
        const value = this.refs['textarea']['getValue']();
        this.props.onChange('content', value);
    }
    rawMarkup = () => ({__html: this.md.render(this.props.value)});

    /**
     * Saves the article
     * Checks if the attributes are given to save the article
     */
    saveArticle() {
        const {title, content, description} = this.props.article;
        let data;
        if (title.trim() === '' || content.trim() === '' || description.trim() === '') {
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.saveFailedMessage'),
                timeout: 3000,
                actionHandler: () => this.props.router.push({path: 'home'}),
                actionText: i18n.t('edit-cartridge.content.snackBar.saveActionText')
            };
        } else {
            this.props.saveArticle(this.props.article);
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.saveSuccessMessage'),
                timeout: 3000,
                actionHandler: () => this.props.router.push({path: 'home'}),
                actionText: i18n.t('edit-cartridge.content.snackBar.saveActionText')
            };
        }
        this.props.showSnackBar(data);
    }

    componentWillMount() {
        window.addEventListener('resize', () => this.forceUpdate());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.forceUpdate());
    }

    getRowNumber = () => {
        const textField = this.refs['content-area-textarea'] as Element;
        if (textField) {
            return Math.round(textField.clientHeight / 25) - 2;
        } else {
            return 10;
        }
    }

    render() {
        return (
            <div className='content-edit'>
                <div className='header-edit'>
                    <div className='header-item-edit'>
                        <RaisedButton
                            primary={true}
                            className='save-button'
                            onClick={this.saveArticle.bind(this)}
                            label={i18n.t('button.save')}
                        />
                    </div>
                    <div className='header-item-preview'>
                        <p>{i18n.t('content-area.preview')}</p>
                    </div>
                </div>
                <div className='content-area'>
                    <div className='content-area-textarea' ref='content-area-textarea'>
                        <TextField
                            ref='textarea'
                            multiLine={true}
                            fullWidth={true}
                            hintText={i18n.t('article-edit.content.placeholder')}
                            value={this.props.value}
                            onChange={this.handleChange}
                            rowsMax={this.getRowNumber()}
                            rows={this.getRowNumber()}
                        />
                    </div>
                    <div
                        className='content-area-display'
                        dangerouslySetInnerHTML={this.rawMarkup() }
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(ContentArea);
