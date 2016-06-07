import {PropTypes} from 'react';
import {Link} from 'react-router';

/** Component that displays an article as a line. */
function ArticleLine({article}) {
    return (
        <Link className='article-list-item' to='/'>
            <i className='material-icons'>receipt</i>
            <div className='article-list-item-content'>
                <div className='article-list-item-content-title'>
                    {article.title}
                </div>
                <div className='article-list-item-content-description'>
                    {article.description}
                </div>
            </div>
            <Link className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored article-list-item-button' to={`edit-article/${article.id}`}>
                <i className='material-icons'>edit</i>
                éditer
            </Link>
        </Link>
    );
}

ArticleLine.propTypes = {
    article: PropTypes.object.isRequired,
};

ArticleLine.displayName = 'ArticleLine';
export default ArticleLine;
