import {connect} from 'react-redux';
import * as React from 'react';
import i18n from 'i18next';
import {manageArticleSection} from '../../actions/article-detail';
import {FlatButton, AutoComplete, List, Subheader, ListItem, Dialog, Checkbox} from 'material-ui';
import {NavigationClose} from 'material-ui/svg-icons';
import {State} from '../../store/default-state';

export class Sections extends React.Component<any, any> {

    static propTypes = {
        callAddSectionDialog: React.PropTypes.bool,
    };

    state = {
        searchText: '',
        dialogOpen: false,
        alertOpen: false,
        sectionToDelete: null,
        sectionToAdd: null,
        primaryNestedText: i18n.t('edit-page.content.sections.show-more'),
        nestedListIsLoaded: false
    };

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

    showAddSectionDialog = () => {
        if (this.props.callAddSectionDialog === true && this.state.dialogOpen === false) {
            return true;
        } else if (this.props.callAddSectionDialog === false && this.state.dialogOpen === true) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {searchText, alertOpen} = this.state;

        return (
            <div>
                <Dialog
                    actions={[<FlatButton label={i18n.t('edit-page.content.sections.close') } primary={true} onClick={this.showDialog} />]}
                    open={this.showAddSectionDialog()}
                    onRequestClose={this.showDialog}
                    autoScrollBodyContent={true}
                    style={{ height: '1550px', maxHeight: '1550px' }} >
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
                {this.showPrimarySectionList() }
                {this.showSecondarySectionList() }
            </div>
        );
    }
}

export default connect(
    (state: State) => ({
        article: state.articleDetail.article,
    }),
    dispatch => ({
        manageArticleSection: (article, attribute, sections, successHandler) => dispatch(manageArticleSection(article, attribute, sections, successHandler))
    })
)(Sections);
