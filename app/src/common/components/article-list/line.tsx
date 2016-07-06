import * as React from 'react';
import {Article} from '../../definitions/article';
import {Link} from 'react-router';
import i18n from 'i18next';
import {RaisedButton, FontIcon} from 'material-ui';

/** Component that displays an article as a line. */
export function ArticleLine({article: {id, title, description}, canEdit}: {article: Article, canEdit: boolean}) {
    return (
        <div className='item'>
            <i className='material-icons'>receipt</i>
            <Link className='content' to={`article/${id}`}>
                <div className='title'>
                    {title}
                </div>
                <div className='description'>
                    {description}
                </div>
            </Link>
            {canEdit ?
                <Link className='button' to={`edit-article/${id}`}>
                    <RaisedButton
                        primary={true}
                        label={i18n.t('article-list.item.edit')}
                        icon={<FontIcon color='white' className='material-icons'>edit</FontIcon>}
                    />
                </Link>
            : null}
        </div>
    );
}
