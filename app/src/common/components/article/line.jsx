import {PropTypes} from 'react';

/** Component that displays an article as a line. */
function ArticleLine({article, onClickEdit}) {
    return (
        <a className='article-list-item' href="#">
            <i className='material-icons'>receipt</i>
            <div className='article-list-item-content'>
                <div className='article-list-item-content-title'>
                    {article.title}
                </div>
                <div className='article-list-item-content-description'>
                    {article.description}
                </div>
            </div>
            <div
                className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored article-list-item-button'
                onClick={() => onClickEdit(article.id)}
            >
                <i className='material-icons'>edit</i>
                éditer
            </div>
        </a>
    );
}

ArticleLine.propTypes = {
    article: PropTypes.object.isRequired,
    onClickEdit: PropTypes.func.isRequired
};
ArticleLine.displayName = 'ArticleLine';
export default ArticleLine;
