import {Component} from 'react';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle, saveArticle, deleteArticle, showEditPopup, showSnackBar} from '../../actions/article-detail';
import {withRouter} from 'react-router';
import {TextField, IconMenu, IconButton, MenuItem, Dialog, FlatButton} from 'material-ui';

@connect(
    state => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected,
        showPopup: state.articleDetail.showPopup,
        snackbarData: state.articleDetail.snackbarData
    }),
    dispatch => ({
        updateArticle: (attribute, value) => dispatch(updateArticle(attribute, value)),
        saveArticle: article => dispatch(saveArticle(article)),
        deleteArticle: id => dispatch(deleteArticle(id)),
        showEditPopup: () => dispatch(showEditPopup()),
        showSnackBar: (snackbarData) => dispatch(showSnackBar(snackbarData))
    })
)
class EditCartridgeContent extends Component<any, any> {

    deleteArticle = () => {
        this.props.showEditPopup();
        this.props.deleteArticle(this.props.article.id);
        this.props.router.push({path: 'home'});
    };

    /**
     * Saves the article
     * Checks if the attributes are given to save the article
     */
    saveArticle() {
        const {title, content, description} = this.props.article;
        let data;
        if (title.trim() === '' || content.trim() === '' || description.trim() === '') {
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.saveFailedMessage'),
                timeout: 3000,
                actionHandler: () => {this.props.router.push({ path: 'home' }); },
                actionText: i18n.t('edit-cartridge.content.snackBar.saveActionText')
            };
        } else {
            this.props.saveArticle(this.props.article);
            data = {
                message: i18n.t('edit-cartridge.content.snackBar.saveSuccessMessage'),
                timeout: 3000,
                actionHandler: () => {this.props.router.push({ path: 'home' }); },
                actionText: i18n.t('edit-cartridge.content.snackBar.saveActionText')
            };
        }
        this.props.showSnackBar(data);
    }

    onChangeHandler(changeEvent) {
        this.props.updateArticle(changeEvent.target.name, changeEvent.target.value);
    }

    /**
     * Updates the article 'published' attribute
     * Gives the data for the snackbar
     */
    clickPublishHandler = () => {
        if (this.props.article.published) {
            this.props.updateArticle('published', false);
            this.props.showSnackBar({
                message: i18n.t('edit-cartridge.content.snackBar.publishMessage'),
                timeout: 1500,
                actionHandler: () => this.saveArticle(),
                actionText: i18n.t('button.save')
            });
        } else {
            this.props.updateArticle('published', true);
            this.props.showSnackBar({
                message: i18n.t('edit-cartridge.content.snackBar.unpublishMessage'),
                timeout: 1500,
                actionHandler: () => this.saveArticle(),
                actionText: i18n.t('button.save')
            });
        }
    }

    /**
     * Sets the information data to display
     */
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
                return <p>`{i18n.t('edit-cartridge.content.label.modifiedSince')} ${diff} {i18n.t('edit-cartridge.content.label.days')}`</p>;
            } else if (diff > 29) {
                return <p>`{i18n.t('edit-cartridge.content.label.modifiedSince')} ${month} {i18n.t('edit-cartridge.content.label.months')}`</p>;
            } else if (month => 12) {
                if (year === 1) {
                    return <p>`{i18n.t('edit-cartridge.content.label.modifiedSince')} ${year} {i18n.t('edit-cartridge.content.label.year')}`</p>;
                } else {
                    return <p>`{i18n.t('edit-cartridge.content.label.modifiedSince')} ${year} {i18n.t('edit-cartridge.content.label.years')}`</p>;
                }
            }
        }

    }

    render() {
        const {connected} = this.props;
        if (!connected) {
            return <div />;
        }
        return (
            <div>
                <div className='content-flex-cartridge'>
                    <TextField
                        className='input-div'
                        name='title'
                        hintText={i18n.t('edit-cartridge.input.title')}
                        onChange={this.onChangeHandler.bind(this)}
                        value={this.props.article.title}
                    />
                </div>

                <div className='content-flex-cartridge'>
                    <div className='input-div-parent'>
                        <TextField
                            className='input-div-area'
                            name='description'
                            multiLine={true}
                            rows={2}
                            rowsMax={2}
                            fullWidth={true}
                            hintText={i18n.t('edit-cartridge.input.description')}
                            onChange={this.onChangeHandler.bind(this)}
                            value={this.props.article.description}
                        />
                    </div>

                    <span className='publish-label'>
                        {this.props.article.published ? i18n.t('edit-cartridge.content.published') : i18n.t('edit-cartridge.content.toPublish')}
                        {this.dateChecker()}
                    </span>
                    <div className='publish-article'>
                        <IconMenu
                            iconButtonElement={<IconButton><i className='material-icons'>keyboard_arrow_down</i></IconButton>}
                            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                            targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        >
                            <MenuItem
                                primaryText={this.props.article.published ? i18n.t('edit-cartridge.content.unpublish') : i18n.t('edit-cartridge.content.publish')}
                                onClick={this.clickPublishHandler}
                            />
                        </IconMenu>
                    </div>
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
