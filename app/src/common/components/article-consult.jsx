import React, {PropTypes} from 'react';
import Markdown from 'remarkable';
import {loadArticle} from '../actions/article-detail';
import {connect} from 'react-redux';
import {CircularProgress, FlatButton} from 'material-ui';
import i18n from 'i18next';
import {withRouter} from 'react-router';

export default withRouter(
connect(
    state => ({
        article: state.articleDetail.article,
        isLoading: state.articleDetail.isLoading,
        error: state.articleDetail.error,
        isConnected: state.login.isConnected
    }),
    dispatch => ({loadArticle: id => dispatch(loadArticle(id))})
)(class ArticleConsult extends React.Component {

    static propTypes = {
        isExtension: PropTypes.bool
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired
    };

    static defaultProps = {
        isExtension: false
    };

    md = new Markdown();
    rawMarkup = () => ({__html: this.md.render(this.props.article.content)});

    componentWillMount() {
        this.props.loadArticle(this.props.id);
    }

    render() {
        const {article, isLoading, error, isExtension, isConnected, leftContent, rightContent} = this.props;
        return (
            <div className='article-consult'>
                {isExtension ?
                    <header style={{backgroundColor: this.context.muiTheme.palette.primary1Color}}>
                        <div className='left-content'>
                            {leftContent? leftContent : <div/>}
                        </div>
                        <div className='right-content'>
                            {rightContent? rightContent : <div/>}
                        </div>
                    </header>
                    : null
                }
                <div className='article-card'>
                    {!isExtension ?
                        <div className='top-header'>
                            <div className='right-content'>
                                <FlatButton label={i18n.t('button.print') } icon={<i className="material-icons">print</i>} secondary={true} onClick={() => window.print() } />
                                <FlatButton
                                    label={i18n.t('button.share') }
                                    icon={<i className="material-icons">share</i>}
                                    secondary={true}
                                    onClick={() => window.location.href = `mailto:?subject=[Article ${i18n.t('back-office.title')}] ${i18n.t('article.title')} : ${this.props.article.title}&body=${window.location.href}`}
                                    />
                                {isConnected ?
                                    <FlatButton label={i18n.t('button.edit') } icon={<i className="material-icons">edit</i>} secondary={true} onClick={() => this.props.router.push(`/edit-article/${article.id}`) } />
                                    : null
                                }
                            </div>
                        </div>
                        : null
                    }
                    {isLoading ? <CircularProgress style={{marginLeft: 'calc(50% - 25px)'}} /> : null}
                    {error ?
                        <div className='error'><i className='material-icons'>error</i><div>{error}</div></div>
                        : null}
                    {!isLoading ?
                        <div id='article'>
                            <h2 style={{color: this.context.muiTheme.palette.primary1Color}}>{article.title}</h2>
                            <div dangerouslySetInnerHTML={this.rawMarkup() } />
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}));
