import {Component} from 'react';
import Markdown from 'remarkable';
import {loadArticle} from '../actions/article-detail';
import {connect} from 'react-redux';
import {Link} from 'react-router';

@connect(
    state => ({
        article: state.articleDetail.article,
        isLoading: state.articleDetail.isLoading,
        error: state.articleDetail.error
    }),
    dispatch => ({loadArticle: id => dispatch(loadArticle(id))})
)
export class ArticleConsult extends Component {

    md = new Markdown();
    rawMarkup = () => ({__html: this.md.render(this.props.article.content)});

    componentWillMount() {
        this.props.loadArticle(this.props.id);
    }

    render() {
        const {article, isLoading, error} = this.props;
        return (
            <div className='article-consult'>
                <div className='article-consult-card'>
                    <div className='article-consult-card-close'>
                        <Link to='/'><i className='material-icons'>close</i></Link>
                    </div>
                    <div
                        style={!isLoading ? {display: 'none'} : {}}
                        className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner is-upgraded ${isLoading ? 'is-active' : ''}`}
                    />
                    {error ?
                        <div className='error'><i className='material-icons'>error</i><div>{error}</div></div>
                    : ''}
                    {!isLoading ?
                        <div>
                            <h3>{article.title}</h3>
                            <div dangerouslySetInnerHTML={this.rawMarkup()} />
                        </div>
                    : ''}
                </div>
            </div>
        );
    }
}
