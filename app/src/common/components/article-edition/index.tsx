import {connect} from 'react-redux';
import * as React from 'react';
import ContentArea from './content-area';
import i18n from 'i18next';
import {loadArticle, clearArticle, manageArticleSection} from '../../actions/article-detail';
import {TextField, FlatButton, IconButton, AutoComplete} from 'material-ui';
import Chip from 'material-ui/chip';

import {State} from '../../store/default-state';

export class EditPage extends React.Component<any, any> {
    static propTypes = { id: React.PropTypes.number };

    state = { isVisible: false, searchText: '' };

    componentWillMount() {
        this.props.clearArticle();
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        }
    }

    updateArticle = () => {
        const {article} = this.props;
        const {searchText} = this.state;

        let sections = [];
        article.sections.map(section => { sections.push(section); });
        searchText.split(',').map((value, index) => { sections.push({ name: value }); });
        this.props.manageArticleSection('sections', this.props.article.id, sections);
        this.setState({searchText: ''});
    };

    removeSectionClickHandler(sectionToDelete) {
        const {sections} = this.props.article;
        let list = [];
        sections.map(section => {
            if (section.id !== sectionToDelete && section.name !== sectionToDelete.name) {
                list.push(section);
            }
        });
        this.props.manageArticleSection('sections', this.props.article.id, list);
    }

    showSections() {
        const {sections} = this.props.article;
        return sections.map(section => {
            return (
                <Chip onRequestDelete={() => this.removeSectionClickHandler(section) } style={{ margin: 4 }} >
                    {section.name}
                </Chip>
            );
        });
    }

    onChangeHandler = (value) => {
        this.setState({searchText: value});
    };

    checkSections() {
        if (this.props.article.sections) {
            return this.props.article.sections.map(section => section.name);
        } else {
            return [];
        }
    }

    render() {
        if (!this.props.connected) {
            return <div />;
        }

        const {isVisible, searchText} = this.state;

        return (
            <div className='edit-page'>
                <div className={`parameter-panel ${isVisible ? '' : 'hidden'}`} ref='parametersBloc'>
                    <h5>PARAMÉTRAGE</h5>

                    <div className='chips-zone' style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {this.props.article.sections ? this.showSections() : null}
                    </div>

                    <div className='label'>
                        <div>{i18n.t('edit-page.content.section') }</div>
                        <FlatButton label={i18n.t('button.add') } onClick={this.updateArticle}/>
                    </div>
                    <AutoComplete
                        hintText='Rubriques...'
                        dataSource={this.checkSections()}
                        ref='sectionList'
                        onUpdateInput={this.onChangeHandler}
                        searchText={searchText}
                    />

                    <div className='label'>
                        <div>{i18n.t('edit-page.content.context-url') }</div>
                        <FlatButton label={i18n.t('button.edit') } />
                    </div>
                    <TextField hintText='URL...' />

                    <div className='label'>
                        <div>{i18n.t('edit-page.content.bloc-information') }</div>
                        <FlatButton label={i18n.t('button.edit') } />
                    </div>
                    <TextField hintText={`Bloc d'information...`} />
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
        getArticle: id => dispatch(loadArticle(id)),
        clearArticle: () => dispatch(clearArticle()),
        manageArticleSection: (attribute, article, sections) => dispatch(manageArticleSection(attribute, article, sections))
    })
)(EditPage);
