import * as React from 'react';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle, deleteArticle, showEditPopup, clickEditDescription, clickEditTitle} from '../../actions/article-detail';
import {withRouter} from 'react-router';
import {TextField, IconMenu, IconButton, MenuItem, Dialog, FlatButton} from 'material-ui';
import {State} from '../../store/default-state';
import {capitalize} from 'lodash';

@connect(
    (state: State) => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected,
        isEditDescription: state.articleDetail.isEditDescription,
        isEditTitle: state.articleDetail.isEditTitle,
        showPopup: state.articleDetail.showPopup
    }),
    dispatch => ({
        clickEditDescription: () => dispatch(clickEditDescription()),
        clickEditTitle: () => dispatch(clickEditTitle()),
        deleteArticle: id => dispatch(deleteArticle(id)),
        showEditPopup: () => dispatch(showEditPopup()),
        updateArticle: (attribute, value, successHandler) => dispatch(updateArticle(attribute, value, successHandler))
    })
)
class EditCartridgeContent extends React.Component<any, any> {

    goHome = () => this.props.router.push('');

    deleteArticle = () => {
        this.props.showEditPopup();
        this.props.deleteArticle(this.props.article.id);
        this.goHome();
    };

    publishArticle() {
        this.props.updateArticle('published', !this.props.article.published, this.goHome);
    }

    saveArticle(attribute) {
        this.props[`clickEdit${capitalize(attribute)}`]();
        this.props.updateArticle(attribute, this.refs[attribute]['getValue'](), this.goHome);
    }

    formatDate(isoString, text) {
        const date = new Date(isoString);
        return `${i18n.t(text)} ${date.toLocaleDateString()} ${i18n.t('date.to')} ${date.toLocaleTimeString()}`;
    }

    render() {
        const {connected, isEditDescription, isEditTitle} = this.props;
        if (!connected) {
            return <div />;
        }
        return (
            <div className='edit-cartridge'>
                <div className='left'>
                    <div className={`title ${isEditTitle ? 'editing' : ''}`}>
                        {isEditTitle ?
                            <TextField
                                name='title'
                                ref='title'
                                hintText={i18n.t('edit-cartridge.input.title')}
                                defaultValue={this.props.article.title}
                                fullWidth={true}
                            />
                        :
                            <div onClick={this.props.clickEditTitle}>{this.props.article.title}</div>
                        }
                        {isEditTitle ?
                            <IconButton onClick={() => this.saveArticle('title')}>
                                <i className='material-icons'>save</i>
                            </IconButton>
                        : null}
                        <IconButton onClick={this.props.clickEditTitle}>
                            <i className='material-icons'>{isEditTitle ? 'undo' : 'edit'}</i>
                        </IconButton>
                    </div>
                    <div className={`description ${isEditDescription ? 'editing' : ''}`}>
                        {isEditDescription ?
                            <TextField
                                name='description'
                                ref='description'
                                rowsMax={3}
                                multiLine={true}
                                fullWidth={true}
                                hintText={i18n.t('edit-cartridge.input.description')}
                                defaultValue={this.props.article.description}
                            />
                        :
                            <div onClick={this.props.clickEditDescription}>{this.props.article.description}</div>
                        }
                        {isEditDescription ?
                            <IconButton onClick={() => this.saveArticle('description')}>
                                <i className='material-icons'>save</i>
                            </IconButton>
                        : null}
                        <IconButton onClick={this.props.clickEditDescription}>
                            <i className='material-icons'>{isEditDescription ? 'undo' : 'edit'}</i>
                        </IconButton>
                    </div>
                </div>
                <div className='publish'>
                    <div className='label'>
                        {this.props.article.published ? i18n.t('edit-cartridge.content.published') : i18n.t('edit-cartridge.content.toPublish')}
                        <IconMenu
                            iconButtonElement={<IconButton><i className='material-icons'>keyboard_arrow_down</i></IconButton>}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        >
                            <MenuItem
                                primaryText={this.props.article.published ? i18n.t('edit-cartridge.content.unpublish') : i18n.t('edit-cartridge.content.publish')}
                                onClick={() => this.publishArticle()}
                            />
                        </IconMenu>
                    </div>
                    {this.props.article.updatedAt ? <div className='time'>{this.formatDate(this.props.article.updatedAt, 'edit-cartridge.content.updatedAt')}</div> : null}
                    {this.props.article.publishedAt ? <div className='time'>{this.formatDate(this.props.article.publishedAt, 'edit-cartridge.content.publishedAt')}</div> : null}
                </div>
                <Dialog
                    open={this.props.showPopup}
                    title={i18n.t('edit-cartridge.content.popup.confirmMessage')}
                    modal={true}
                    actions={[
                        <FlatButton label={i18n.t('edit-cartridge.content.popup.cancel')} onClick={this.props.showEditPopup} />,
                        <FlatButton primary={true} label={i18n.t('edit-cartridge.content.popup.confirm')} onClick={() => this.deleteArticle()} />
                    ]}
                />
            </div>
        );
    }
}

export default withRouter(EditCartridgeContent);
