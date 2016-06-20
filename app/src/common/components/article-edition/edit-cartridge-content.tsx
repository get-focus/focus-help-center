import {Component} from 'react';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle, saveArticle, deleteArticle, showEditPopup, clickEditDescription, clickEditTitle} from '../../actions/article-detail';
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
        showPopup: state.articleDetail.showPopup,
        snackbarData: state.articleDetail.snackbarData
    }),
    dispatch => ({
        clickEditDescription: () => dispatch(clickEditDescription()),
        clickEditTitle: () => dispatch(clickEditTitle()),
        deleteArticle: id => dispatch(deleteArticle(id)),
        saveArticle: article => dispatch(saveArticle(article)),
        showEditPopup: () => dispatch(showEditPopup()),
        updateArticle: (attribute, value, successHandler) => dispatch(updateArticle(attribute, value, successHandler))
    })
)
class EditCartridgeContent extends Component<any, any> {

    goHome = () => this.props.router.push({path: 'home'});

    deleteArticle = () => {
        this.props.showEditPopup();
        this.props.deleteArticle(this.props.article.id);
        this.props.router.push({path: 'home'});
    };

    publishArticle() {
        this.props.updateArticle('published', !this.props.article.published, this.goHome);
    }

    saveArticle(attribute) {
        this.props[`clickEdit${capitalize(attribute)}`]();
        this.props.updateArticle(attribute, this.refs[attribute]['getValue'](), this.goHome);
    }

    dateChecker = () => {
        const {updatedAt} = this.props.article;
        const date = new Date(updatedAt);
        const today = new Date();
        const diff = new Date(today.getTime() - date.getTime()).getUTCDate() - 1;
        const month = Math.ceil(diff / 30);
        const year = Math.ceil(month / 12);

        if (updatedAt !== undefined) {
            if (diff === 0) {
                return <p>{i18n.t('edit-cartridge.content.label.oneDay')}</p>;
            } else if (diff > 0) {
                return <p>{`${i18n.t('edit-cartridge.content.label.modifiedSince')} ${diff} ${i18n.t('edit-cartridge.content.label.days')}`}</p>;
            } else if (diff > 29) {
                return <p>{`${i18n.t('edit-cartridge.content.label.modifiedSince')} ${month} ${i18n.t('edit-cartridge.content.label.months')}`}</p>;
            } else if (month => 12) {
                if (year === 1) {
                    return <p>{`${i18n.t('edit-cartridge.content.label.modifiedSince')} ${year} ${i18n.t('edit-cartridge.content.label.year')}`}</p>;
                } else {
                    return <p>{`${i18n.t('edit-cartridge.content.label.modifiedSince')} ${year} ${i18n.t('edit-cartridge.content.label.years')}`}</p>;
                }
            }
        }
    }

    render() {
        const {connected, isEditDescription, isEditTitle} = this.props;
        if (!connected) {
            return <div />;
        }
        return (
            <div className='edit-cartridge'>
                <div className='edit-cartridge-left'>
                    <div className='edit-cartridge-title'>
                        {isEditTitle ?
                            <TextField
                                name='title'
                                ref='title'
                                hintText={i18n.t('edit-cartridge.input.title')}
                                defaultValue={this.props.article.title}
                                fullWidth={true}
                            />
                        :
                            <div>{this.props.article.title}</div>
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
                    <div className={`edit-cartridge-description ${isEditDescription && this.props.article.description.match(/\n/) ? 'multiline' : ''}`}>
                        {isEditDescription ?
                            <TextField
                                name='description'
                                ref='description'
                                multiLine={true}
                                fullWidth={true}
                                hintText={i18n.t('edit-cartridge.input.description')}
                                defaultValue={this.props.article.description}
                            />
                        :
                            <div>{this.props.article.description}</div>
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
                <div className='edit-cartridge-publish'>
                    <div className='publish-label'>
                        {this.props.article.published ? i18n.t('edit-cartridge.content.published') : i18n.t('edit-cartridge.content.toPublish')}
                        <IconMenu
                            iconButtonElement={<IconButton><i className='material-icons'>keyboard_arrow_down</i></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem
                                primaryText={this.props.article.published ? i18n.t('edit-cartridge.content.unpublish') : i18n.t('edit-cartridge.content.publish')}
                                onClick={() => this.publishArticle()}
                            />
                        </IconMenu>
                    </div>
                    {this.dateChecker()}
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
