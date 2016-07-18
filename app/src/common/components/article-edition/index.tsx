import {connect} from 'react-redux';
import * as React from 'react';
import ContentArea from './content-area';
import Sections from './sections';
import i18n from 'i18next';
import {loadArticle, clearArticle, updateArticle, clickEditInformations, clickEditUrl} from '../../actions/article-detail';
import {TextField, FlatButton, IconButton, List, Subheader} from 'material-ui';
import {capitalize} from 'lodash';

import {State} from '../../store/default-state';

export class EditPage extends React.Component<any, any> {
    static propTypes = { id: React.PropTypes.number };

    state = { isVisible: false, dialogOpen: false};

    goHome = () => this.props.router.push('');

    componentWillMount() {
        this.props.clearArticle();
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        }
    }

    showAddSectionDialog = () => {
        this.setState({dialogOpen: !this.state.dialogOpen});
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
                        <div className='section-title'>{i18n.t('edit-page.content.context-url') }
                            <FlatButton label={i18n.t('button.edit') } primary={true} style={{ float: 'right' }} onClick={() => this.saveArticle('url')} />
                        </div>
                    </Subheader>
                    <TextField hintText='URL...' style={{ paddingLeft: '16px' }} ref='url' defaultValue={this.props.article.url ? this.props.article.url : ''} />

                    <Subheader>
                        <div className='section-title' style={{display: 'flex'}}>{i18n.t('edit-page.content.bloc-information') }
                            <FlatButton label={i18n.t('button.edit') } primary={true} style={{ float: 'right' }} onClick={() => this.saveArticle('informations')} />
                        </div>
                    </Subheader>
                    <TextField hintText={`Bloc d'information...`} ref='informations' defaultValue={this.props.article.informations ? this.props.article.informations : ''} style={{ paddingLeft: '16px' }} />
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
    }),
    dispatch => ({
        clickEditInformations: () => dispatch(clickEditInformations()),
        clickEditUrl: () => dispatch(clickEditUrl()),
        getArticle: id => dispatch(loadArticle(id)),
        clearArticle: () => dispatch(clearArticle()),
        updateArticle: (attribute, value, successHandler) => dispatch(updateArticle(attribute, value, successHandler))
    })
)(EditPage);
