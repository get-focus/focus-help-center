import {Component} from 'react';
import Markdown from 'remarkable';
import {loadArticle} from '../actions/article-detail';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {CircularProgress} from 'material-ui';

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
                <div className='card'>
                    <div className='close'>
                        <Link to='/'><i className='material-icons'>close</i></Link>
                    </div>
                    {isLoading ? <CircularProgress style={{marginLeft: 'calc(50% - 25px)'}} /> : null}
                    {error ?
                        <div className='error'><i className='material-icons'>error</i><div>{error}</div></div>
                    : null}
                    {!isLoading ?
                        <div>
                            <h3>{article.title}</h3>
                            <div dangerouslySetInnerHTML={this.rawMarkup()} />
                        </div>
                    : null}
                </div>
            </div>
        );
    }
}
