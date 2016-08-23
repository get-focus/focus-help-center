import * as React from 'react';
import {Article} from '../../definitions/article';
import {Link} from 'react-router';
import i18n from 'i18next';
import {RaisedButton, FontIcon} from 'material-ui';

/** Component that displays an article as a line. */
export function ArticleLine({isExtension, article: {id, title, description, published}, canEdit}: { isExtension: boolean, article: Article, canEdit: boolean }) {
    return (
        <div className={`${isExtension ? ' extension-item' : 'item'}`}>
            <i className='material-icons'>description</i>

            <Link className='content' to={`article/${id}`}>
                <div className='title'>
                    {title} <span className='material-icons'>{ canEdit ? published && canEdit ? 'visibility' : 'visibility_off' : null}</span>
                </div>
                <div className='description'>
                    {description}
                </div>
            </Link>
            {canEdit ?
                <Link className='button' to={`edit-article/${id}`}>
                    <RaisedButton
                        primary={true}
                        label={i18n.t('article-list.item.edit') }
                        style={{borderRadius: '5px'}}
                        icon={<FontIcon color='white' className='material-icons'>edit</FontIcon>}
                        />
                </Link>
                : null
            }
        </div>
    );
}
