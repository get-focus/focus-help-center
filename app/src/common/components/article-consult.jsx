import {Component} from 'react';
import Markdown from 'remarkable';
import {loadArticle} from '../actions/article-detail';
import {connect} from 'react-redux';
import {Link} from 'react-router';

@connect(
    state => ({article: state.articleDetail.article}),
    dispatch => ({loadArticle: id => dispatch(loadArticle(id))})
)
export class ArticleConsult extends Component {

    md = new Markdown();
    rawMarkup = () => ({__html: this.md.render(this.props.article.content)});

    componentWillMount() {
        this.props.loadArticle(this.props.id);
    }

    render() {
        const {title} = this.props.article;
        return (
            <div className='article-consult'>
                <div className='article-consult-card'>
                    <div className='article-consult-card-close'>
                        <Link to='/'><i className='material-icons'>close</i></Link>
                    </div>
                    <h3>{title}</h3>
                    <div dangerouslySetInnerHTML={this.rawMarkup()} />
                </div>
            </div>
        );
    }
}
