import React, {PropTypes} from 'react';
import Markdown from 'remarkable';
import {loadArticle} from '../actions/article-detail';
import {connect} from 'react-redux';
import {CircularProgress, FlatButton} from 'material-ui';
import i18n from 'i18next';
import {Link} from 'react-router';

@connect(
    state => ({
        article: state.articleDetail.article,
        isLoading: state.articleDetail.isLoading,
        error: state.articleDetail.error
    }),
    dispatch => ({loadArticle: id => dispatch(loadArticle(id))})
)
export class ArticleConsult extends React.Component {

    static propTypes = {
        isExtension: PropTypes.bool
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
        console.log();
        const {article, isLoading, error, isExtension} = this.props;
        return (
            <div className='article-consult'>
                {isExtension ?
                    <header>
                        <div className='left-content'>
                            <FlatButton label={i18n.t('button.print')} icon={<i className="material-icons">print</i>} secondary={true} onClick={() => window.print() } />
                            <FlatButton label={i18n.t('button.share')} icon={<i className="material-icons">share</i>} secondary={true} onClick={() => window.location.href = `mailto:?subject=[Article centre d\'aide] Remarque / Question&body=${window.location.href}`} />

                        </div>
                        <div className='right-content'>
                            <Link to='/home'> <i className='material-icons close'>close</i></Link>
                        </div>
                    </header>
                    : null
                }
                <div className='article-card'>
                    {!isExtension ?
                        <div className='top-header'>
                            <div className='left-content'>
                                <FlatButton label={i18n.t('button.print')} icon={<i className="material-icons">print</i>} secondary={true} onClick={() => window.print() } />
                                <FlatButton
                                    label={i18n.t('button.share')}
                                    icon={<i className="material-icons">share</i>}
                                    secondary={true}
                                    onClick={() => window.location.href = `mailto:?subject=[Article centre d\'aide] Titre : ${this.props.article.title}&body=${window.location.href}`}
                                    />

                            </div>
                            <div className='right-content'>
                                <Link to='/home'> <i className='material-icons close'>close</i></Link>
                            </div>
                        </div>
                        : null
                    }
                    {isLoading ? <CircularProgress style={{marginLeft: 'calc(50% - 25px)'}} /> : null}
                    {error ?
                        <div className='error'><i className='material-icons'>error</i><div>{error}</div></div>
                        : null}
                    {!isLoading ?
                        <div id='article' className={`${isExtension ? 'article-extension' : ''}`}>
                            <h2>{article.title}</h2>
                            <div dangerouslySetInnerHTML={this.rawMarkup() } />
                        </div>
                        : null}
                </div>
            </div>
        );
    }
}
