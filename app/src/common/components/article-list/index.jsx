import {connect} from 'react-redux';
import {Component, PropTypes} from 'react';

import {loadArticleList} from '../../actions/article-list';
import {saveArticle} from '../../actions/article-detail';
import {showSnackBar} from '../../actions/snack-bar';
import {ArticleList as List} from './list';
import {Dialog, FlatButton, TextField} from 'material-ui';
import i18n from 'i18next';
import {withRouter} from 'react-router';

/** Component that displays the list of all articles, connected to the store. */
@withRouter
@connect(
    state => ({
        articleList: state.articleList,
        connected: state.login.isConnected
    }),
    dispatch => ({
        loadArticleList: () => dispatch(loadArticleList()),
        saveArticle: (title, description) => dispatch(saveArticle({title, description})),
        showSnackBar: data => dispatch(showSnackBar(data))
    })
)
export class ArticleList extends Component {
    static propTypes = {
        articleList: PropTypes.object,
        loadArticleList: PropTypes.func,
        connected: PropTypes.bool
    }

    state = {open: false};

    componentWillMount() {
        this.props.loadArticleList();
    }

    componentWillReceiveProps({connected}) {
        if (this.props.connected !== connected) {
            this.componentWillMount();
        }
    }

    async saveArticle() {
        const title = this.refs.title.getValue();
        const description = this.refs.description.getValue();
        if (title && description) {
            try {
                const id = await this.props.saveArticle(title, description);
                this.props.showSnackBar({
                    message: 'edit-cartridge.content.snackBar.saveSuccessMessage',
                    actionText: 'article-list.item.edit',
                    actionHandler: () => this.props.router.push(`edit-article/${id}`),
                    isError: false
                });
                this.props.loadArticleList();
                this.toggleModal();
            } catch (e) {
                this.props.showSnackBar({
                    message: 'edit-cartridge.content.snackBar.saveFailedMessage',
                    isError: true
                });
            }
        } else {
            this.props.showSnackBar({
                message: 'edit-cartridge.content.snackBar.saveFailedContentMessage',
                isError: true
            });
        }
    }

    toggleModal() {
        this.setState({open: !this.state.open});
    }

    render() {
        const {connected, articleList} = this.props;
        return (
            <div style={{flex: 1}}>
                <List articleList={articleList} connected={connected} openCreate={() => this.toggleModal()} />
                <Dialog
                    title={i18n.t('article.create.dialog')}
                    actions={[<FlatButton label={i18n.t('article.create.confirm')} primary={true} onClick={() => this.saveArticle()} />]}
                    open={this.state.open}
                    onRequestClose={() => this.toggleModal()}
                >
                    <div>
                        <TextField ref='title' hintText={i18n.t('article.title')} />
                        <br />
                        <TextField ref='description' hintText={i18n.t('article.description')} />
                    </div>
                </Dialog>
            </div>
        );
    }
}
