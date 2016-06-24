import React, {PropTypes} from 'react';
import Markdown from 'remarkable';
import {loadArticle} from '../actions/article-detail';
import {connect} from 'react-redux';
import {CircularProgress} from 'material-ui';

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
        leftContent: PropTypes.object,
        rightContent: PropTypes.object,
        isExtension: PropTypes.bool
    };

    static defaultProps = {
        isExtension: false
    }

    md = new Markdown();
    rawMarkup = () => ({__html: this.md.render(this.props.article.content)});

    componentWillMount() {
        this.props.loadArticle(this.props.id);
    }

    render() {
        const {article, isLoading, error, leftContent, rightContent, isExtension} = this.props;
        return (
            <div className='article-consult'>
                {isExtension?
                    <header>
                        <div className='left-content'>
                            {leftContent? leftContent : <div/>}
                        </div>
                        <div className='right-content'>
                            {rightContent? rightContent : <div/>}
                        </div>
                    </header>
                    : null
                }
                <div className='card'>
                    {!isExtension?
                        <div className='top-header'>
                            <div className='left-content'>
                                {leftContent? leftContent : <div/>}
                            </div>
                            <div className='right-content'>
                                {rightContent? rightContent : <div/>}
                            </div>
                        </div>
                        :null
                    }
                    {isLoading ? <CircularProgress style={{marginLeft: 'calc(50% - 25px)'}} /> : null}
                    {error ?
                        <div className='error'><i className='material-icons'>error</i><div>{error}</div></div>
                    : null}
                    {!isLoading ?
                        <div id='article'>
                            <h2>{article.title}</h2>
                            <div dangerouslySetInnerHTML={this.rawMarkup()} />
                        </div>
                    : null}
                </div>
            </div>
        );
    }
}
