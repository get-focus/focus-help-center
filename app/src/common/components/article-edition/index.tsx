import {connect} from 'react-redux';
import * as React from 'react';
import ContentArea from './content-area';
import i18n from 'i18next';
import {loadArticle, clearArticle} from '../../actions/article-detail';
import {TextField, FlatButton, IconButton} from 'material-ui';
import {State} from '../../store/default-state';

export class EditPage extends React.Component<any, any> {
    static propTypes = {id: React.PropTypes.number};

    state = {isVisible: false};

    componentWillMount() {
        this.props.clearArticle();
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        }
    }

    render() {
        if (!this.props.connected) {
            return <div />;
        }

        const {isVisible} = this.state;
        return (
            <div className='edit-page'>
                <div className={`parameter-panel ${isVisible ? '' : 'hidden'}`} ref='parametersBloc'>
                    <h5>PARAMÉTRAGE</h5>

                    <div className='label'>
                        <div>{i18n.t('edit-page.content.section')}</div>
                        <FlatButton label={i18n.t('button.add')} />
                    </div>
                    <TextField hintText='Rubriques' />

                    <div className='label'>
                        <div>{i18n.t('edit-page.content.context-url')}</div>
                        <FlatButton label={i18n.t('button.edit')} />
                    </div>
                    <TextField hintText='URL...' />

                    <div className='label'>
                        <div>{i18n.t('edit-page.content.bloc-information')}</div>
                        <FlatButton label={i18n.t('button.edit')} />
                    </div>
                    <TextField hintText={`Bloc d'information...`} />
                </div>

                <div className='parameter-drawer'>
                    <IconButton onClick={() => this.setState({isVisible: !this.state.isVisible})}>
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
        getArticle: id => dispatch(loadArticle(id)),
        clearArticle: () => dispatch(clearArticle()),
    })
)(EditPage);
