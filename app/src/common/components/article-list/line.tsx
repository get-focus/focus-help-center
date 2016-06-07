import {Article} from '../../definitions/article';
import {Link} from 'react-router';
import i18n from 'i18next';

/** Component that displays an article as a line. */
export function ArticleLine({article: {id, title, description}, onClickEdit}: {article: Article, onClickEdit}) {
    return (
        <Link className='article-list-item' to='/'>
            <i className='material-icons'>receipt</i>
            <div className='article-list-item-content'>
                <div className='article-list-item-content-title'>
                    {title}
                </div>
                <div className='article-list-item-content-description'>
                    {description}
                </div>
            </div>
            <Link className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored article-list-item-button' to={`edit-article/${article.id}`}>
                <i className='material-icons'>edit</i>
                {i18n.t('article-list.item.edit')}
            </Link>
        </Link>
    );
}
