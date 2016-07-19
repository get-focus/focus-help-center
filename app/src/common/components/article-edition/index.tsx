import {connect} from 'react-redux';
import * as React from 'react';
import ContentArea from './content-area';
import Sections from './sections';
import i18n from 'i18next';
import {loadArticle, clearArticle, updateArticle, clickEditInformations, clickEditUrl} from '../../actions/article-detail';
import {TextField, FlatButton, IconButton, List, Subheader} from 'material-ui';
import {capitalize, upperCase } from 'lodash';

import {State} from '../../store/default-state';

export class EditPage extends React.Component<any, any> {
    static propTypes = { id: React.PropTypes.number };

    state = { isVisible: false, dialogOpen: false };

    goHome = () => this.props.router.push('');

    componentDidUpdate() {
        if (this.props.isEditInformations) {
            this.refs.informations.focus();
        }
        if (this.props.isEditUrl) {
            this.refs.url.focus();
        }
    }

    componentWillMount() {
        this.props.clearArticle();
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        }
    }

    showAddSectionDialog = () => {
        this.setState({ dialogOpen: !this.state.dialogOpen });
    }

    saveArticle(attribute) {
        this.props[`clickEdit${capitalize(attribute)}`]();
        this.props.updateArticle(attribute, this.refs[attribute]['getValue'](), this.goHome);
    }

    render() {
        if (!this.props.connected) {
            return <div />;
        }

        const {isVisible, dialogOpen} = this.state;
        const {isEditUrl, isEditInformations} = this.props;

        return (
            <div className='edit-page'>
                <div className={`parameter-panel ${isVisible ? '' : 'hidden'}`} ref='parametersBloc'>
                    <h5>PARAMÉTRAGE</h5>

                    <List>
                        <Subheader>
                            <div className='section-title'>{i18n.t('edit-page.content.sections.title') }
                                <FlatButton label={i18n.t('button.add') } onClick={this.showAddSectionDialog} primary={true} style={{ float: 'right' }} />
                            </div>
                        </Subheader>
                        <Sections callAddSectionDialog={dialogOpen} />
                    </List>

                    <Subheader>
                        <div className='section-title'>{i18n.t('edit-page.content.context-url') }</div>
                    </Subheader>
                    <div className='left'>
                        <div className={`url ${isEditUrl ? 'editing' : ''}`}>
                            {isEditUrl ?
                                <TextField
                                    name='url'
                                    ref='url'
                                    hintText={upperCase(i18n.t('edit-page.content.context-url'))}
                                    defaultValue={this.props.article.url}
                                    fullWidth={true}
                                    />
                                : !this.props.article.url || this.props.article.url.trim() === '' ?
                                    <div onClick={() => this.props.clickEditUrl() }><em>Ajoutez une URL</em></div>
                                    : <div onClick={() => this.props.clickEditUrl() }>{this.props.article.url}</div>
                            }
                            {isEditUrl ?
                                <IconButton onClick={() => this.saveArticle('url') }>
                                    <i className='material-icons'>save</i>
                                </IconButton>
                                : null}
                            <IconButton onClick={this.props.clickEditUrl}>
                                <i className='material-icons'>{isEditUrl ? 'undo' : 'edit'}</i>
                            </IconButton>
                        </div>
                    </div>

                    <Subheader>
                        <div className='section-title' style={{ display: 'flex' }}>{i18n.t('edit-page.content.bloc-information') }</div>
                    </Subheader>
                    <div className='left'>
                        <div className={`informations ${isEditInformations ? 'editing' : ''}`}>
                            {isEditInformations ?
                                <TextField
                                    name='informations'
                                    ref='informations'
                                    hintText={upperCase('informations')}
                                    defaultValue={this.props.article.informations}
                                    fullWidth={true}
                                    />
                                : !this.props.article.informations || this.props.article.informations.trim() === '' ?
                                    <div onClick={() => this.props.clickEditInformations() }><em>Ajoutez des informations</em></div>
                                    : <div onClick={() => this.props.clickEditInformations() }>{this.props.article.informations}</div>
                            }
                            {isEditInformations ?
                                <IconButton onClick={() => this.saveArticle('informations') }>
                                    <i className='material-icons'>save</i>
                                </IconButton>
                                : null}
                            <IconButton onClick={this.props.clickEditInformations}>
                                <i className='material-icons'>{isEditInformations ? 'undo' : 'edit'}</i>
                            </IconButton>
                        </div>
                    </div>
                </div>

                <div className='parameter-drawer'>
                    <IconButton onClick={() => this.setState({ isVisible: !this.state.isVisible }) }>
                        <i className='material-icons'>settings</i>
                    </IconButton>
                    <br />
                    <div className={`text ${isVisible ? 'hidden' : ''}`}>PARAMÉTRAGE</div>
                </div>
                <ContentArea />
            </div>
        );
    }
}

export default connect(
    (state: State) => ({
        article: state.articleDetail.article,
        connected: state.login.isConnected,
        isEditUrl: state.articleDetail.isEditUrl,
        isEditInformations: state.articleDetail.isEditInformations
    }),
    dispatch => ({
        clickEditInformations: () => dispatch(clickEditInformations()),
        clickEditUrl: () => dispatch(clickEditUrl()),
        getArticle: id => dispatch(loadArticle(id)),
        clearArticle: () => dispatch(clearArticle()),
        updateArticle: (attribute, value, successHandler) => dispatch(updateArticle(attribute, value, successHandler))
    })
)(EditPage);
