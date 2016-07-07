import {connect} from 'react-redux';
import * as React from 'react';
import ContentArea from './content-area';
import i18n from 'i18next';
import {loadArticle, clearArticle, manageArticleSection} from '../../actions/article-detail';
import {TextField, FlatButton, IconButton, AutoComplete, List, Subheader, ListItem, Dialog, Checkbox} from 'material-ui';
import {NavigationClose} from 'material-ui/svg-icons';

import {State} from '../../store/default-state';

export class EditPage extends React.Component<any, any> {
    static propTypes = { id: React.PropTypes.number };

    state = { isVisible: false, searchText: '', dialogOpen: false, alertOpen: false, sectionToDelete: null, sectionToAdd: null, primaryNestedText: i18n.t('edit-page.content.sections.show-more'), nestedListIsLoaded: false };

    componentWillMount() {
        this.props.clearArticle();
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        }
    }

    componentDidUpdate() {
        this.setPrimaryNested();
    }

    updateArticle = () => {
        const {article} = this.props;
        const {searchText, sectionToAdd} = this.state;

        let sections = [];
        article.sections.map(section => { sections.push(section); });
        searchText.split(',').map((value, index) => { sections.push({ name: value }); });
        if (sectionToAdd !== null) {
            sections.push(sectionToAdd);
        }
        this.props.manageArticleSection(article, 'sections', sections);
        this.setState({ searchText: '', sectionToAdd: null });
    };

    removeSectionClickHandler = () => {
        const {sections} = this.props.article;
        const {sectionToDelete} = this.state;
        let list = [];
        sections.map(section => {
            if (section.id !== sectionToDelete && section.name !== sectionToDelete.name) {
                list.push(section);
            }
        });
        this.props.manageArticleSection(this.props.article, 'sections', list);
        this.showDeleteAlert(null);
    }

    onChangeHandler = (value) => {
        this.setState({ searchText: value });
    };

    showDialog = () => {
        this.setState({ dialogOpen: !this.state.dialogOpen });
    }

    showDeleteAlert = (section) => {
        if (this.state.alertOpen) {
            this.setState({ alertOpen: !this.state.alertOpen, sectionToDelete: section });
        } else {
            this.setState({ alertOpen: !this.state.alertOpen, sectionToDelete: section });
        }
    }

    showPrimarySectionList = () => {
        const {sections} = this.props.article;
        if (this.props.article.sections) {
            return sections.map((section, index) => {
                if (index <= 1) {
                    return <ListItem key={index} primaryText={section.name} rightIcon={<NavigationClose onClick={() => this.showDeleteAlert(section) }/>} />;
                }
            });
        }
    };

    onNestedListToggle = () => {
        this.state.primaryNestedText === i18n.t('edit-page.content.sections.show-more') ?
            this.setState({ primaryNestedText: i18n.t('edit-page.content.sections.show-less') }) : this.setState({ primaryNestedText: i18n.t('edit-page.content.sections.show-more') });
    }

    showSecondarySectionList = () => {
        const {sections} = this.props.article;
        if (this.props.article.sections && this.props.article.sections.length > 2) {
            let sectionList = sections.map((section, index) => {
                if (index > 1) {
                    return <ListItem key={index} primaryText={section.name} rightIcon={<NavigationClose onClick={() => this.showDeleteAlert(section) }/>} />;
                }
            });
            return (
                <ListItem primaryText={this.state.primaryNestedText} primaryTogglesNestedList={true} nestedItems={sectionList} onNestedListToggle={this.onNestedListToggle} ref='primaryNested' />
            );
        }
    };

    setPrimaryNested = () => {
        if (this.refs['primaryNested']) {
            if (!this.refs['primaryNested']['state'].isKeyboardFocused) {
                this.refs['primaryNested']['setState']({ isKeyboardFocused: true });
            }
        }
    };

    checkSections() {
        if (this.props.article.sections) {
            return this.props.article.sections.map(section => section.name);
        } else {
            return [];
        }
    }

    onCheckHandler = (key, event, checked) => {
        const {sections} = this.props.article;
        const itemList = this.refs['dialogList']['props'].children;
        let searchedItem;

        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].key === key.toString()) {
                searchedItem = itemList[i];
                if (checked === false) {
                    this.showDeleteAlert(sections[i]);
                } else if (checked === true) {
                    this.setState({ sectionToAdd: sections[i] });
                    this.updateArticle();
                }
            }
        }
    }

    // HERE, WE HAVE TO DISPLAY ALL THE SECTIONS
    // BY THE MOMENT, IT DISPLAYS ONLY THE ARTICLE'S SECTIONS
    showAllSection = () => {
        const {sections} = this.props.article;
        if (this.props.article.sections && this.props.article.sections.length > 0) {
            return (
                <List ref='dialogList' >
                    {sections.map((section, index) => {
                        return (
                            <ListItem key={index} primaryText={section.name} leftCheckbox={<Checkbox defaultChecked={true} onCheck={this.onCheckHandler.bind(null, index) } />} />
                        );
                    }) }
                </List>
            );
        } else {
            return <div><br/><br/><br/></div>;
        }
    };

    render() {
        if (!this.props.connected) {
            return <div />;
        }

        const {isVisible, searchText, dialogOpen, alertOpen} = this.state;

        return (
            <div className='edit-page'>
                <Dialog className='hello' open={dialogOpen} onRequestClose={this.showDialog} autoScrollBodyContent={true} style={{ height: '1550px', maxHeight: '1550px' }} >
                    <Subheader><em>{i18n.t('edit-page.content.sections.new-section') }</em></Subheader>
                    <AutoComplete
                        hintText={i18n.t('edit-page.content.sections.placeholder') }
                        dataSource={this.checkSections() }
                        ref='sectionList'
                        onUpdateInput={this.onChangeHandler}
                        searchText={searchText}
                        style={{ paddingLeft: '16px' }}
                        />
                    <FlatButton label={i18n.t('button.add') } onClick={this.updateArticle} />
                    {this.showAllSection() }
                </Dialog>

                <Dialog open={alertOpen} onRequestClose={this.showDeleteAlert} actions={[
                    <FlatButton
                        label={i18n.t('edit-page.content.sections.cancel-delete') }
                        primary={true}
                        onClick={this.showDeleteAlert}
                        />,
                    <FlatButton
                        label={i18n.t('edit-page.content.sections.confirm-delete') }
                        primary={true}
                        onClick={this.removeSectionClickHandler}
                        />
                ]}>
                    {i18n.t('edit-page.content.sections.alert-delete') }
                </Dialog>

                <div className={`parameter-panel ${isVisible ? '' : 'hidden'}`} ref='parametersBloc'>
                    <h5>PARAMÉTRAGE</h5>

                    <List>
                        <Subheader><div className='section-title'>{i18n.t('edit-page.content.sections.title') }<FlatButton label={i18n.t('button.add') } onClick={this.showDialog} style={{ float: 'right' }} /></div></Subheader>
                        {this.showPrimarySectionList() }
                        {this.showSecondarySectionList() }
                    </List>

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
        manageArticleSection: (article, attribute, sections, successHandler) => dispatch(manageArticleSection(article, attribute, sections, successHandler))
    })
)(EditPage);
