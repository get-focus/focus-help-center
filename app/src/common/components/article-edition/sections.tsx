import {connect} from 'react-redux';
import * as React from 'react';
import i18n from 'i18next';
import {manageArticleSection, updateArticleSections} from '../../actions/article-detail';
import {loadSectionList} from '../../actions/section-list';
import {FlatButton, AutoComplete, List, Subheader, ListItem, Dialog, Checkbox} from 'material-ui';
import {NavigationClose} from 'material-ui/svg-icons';

@connect(
    state => ({
        article: state.articleDetail.article,
        sections: state.sectionList.list
    }),
    dispatch => ({
        manageArticleSection: (article, attribute, sections, successHandler) => dispatch(manageArticleSection(article, attribute, sections, successHandler)),
        updateArticleSections: (article, attribute, sections, successHandler) => dispatch(updateArticleSections(article, attribute, sections, successHandler)),
        loadSectionList: () => dispatch(loadSectionList())
    })
)
export default class Sections extends React.Component<any, any> {

    static propTypes = {
        callAddSectionDialog: React.PropTypes.bool
    };

    state = {
        searchText: '',
        dialogOpen: false,
        alertOpen: false,
        sectionToDelete: null,
        primaryNestedText: i18n.t('edit-page.content.sections.show-more'),
        nestedListIsLoaded: false,
        articleSections: null
    };

    componentWillMount() {
        this.props.loadSectionList();
    }

    componentDidUpdate() {
        const {sections} = this.props.article, {articleSections} = this.state;
        this.setPrimaryNested(); this.showAllSections();

        if (sections && articleSections === null) {
            this.setState({ articleSections: this.props.article.sections });
        }
    }

    updateArticle = () => {
        const {article} = this.props;
        this.props.manageArticleSection(article, 'sections', article.sections);
        this.setState({ searchText: '', articleSections: this.props.article.sections });
    };

    manageSections = (section) => {
        const {article} = this.props, {searchText, sectionToDelete} = this.state;
        let sections = [];

        article.sections.map(section => { sections.push(section); });
        if (searchText.trim() !== '') {
            searchText.split(',').map((value) => { sections.push({ name: value }); });
        }
        if (section && section.name) {
            sections.push(section);
        }

        console.log(sectionToDelete);
        if (sectionToDelete) {
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].id === sectionToDelete.id && sections[i].name === sectionToDelete.name) {
                    sections.splice(i, 1);
                }
            }
        }
        this.props.updateArticleSections(article, 'sections', sections);
        this.setState({ searchText: '', sectionToDelete: null });
    };

    onChangeHandler = (value) => {
        this.setState({ searchText: value });
    };

    showDialog = () => {
        const {sections} = this.props.article, {articleSections} = this.state;
        this.setState({ dialogOpen: !this.state.dialogOpen });
        if (articleSections !== null && (sections.length !== articleSections.length)) {
            this.updateArticle();
            this.props.loadSectionList();
        }
    }

    showDeleteAlert = (section) => {
        this.setState({ alertOpen: !this.state.alertOpen, sectionToDelete: section}, () => this.manageSections(null));
    };

    removeSectionClickHandler = () => {
        const {sections} = this.props.article, {articleSections} = this.state;
        this.setState({ alertOpen: !this.state.alertOpen });
        if (articleSections !== null && (sections.length !== articleSections.length)) {
            this.updateArticle();
            this.props.loadSectionList();
        }
    }

    showPrimarySectionList = () => {
        const {articleSections} = this.state;
        if (articleSections) {
            return articleSections.map((section, index) => {
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
        const {articleSections} = this.state;
        if (articleSections && articleSections.length > 2) {
            let sectionList = articleSections.map((section, index) => {
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
        return this.props.article.sections ? this.props.article.sections.map(section => section.name) : [];
    }

    onCheckHandler = (key, event, checked) => {
        const {sections} = this.props, itemList = this.refs['dialogList']['props'].children;
        let searchedItem;

        itemList.map((item, index) => {
            if (item.key === key.toString()) {
                searchedItem = item;
                if (checked === true) {
                    this.manageSections(sections[index]);
                } else if (checked === false) {
                    this.setState({ sectionToDelete: sections[index] }, () => this.manageSections(null));
                }
            }
        });
    }

    showAllSections = () => {
        const {sections} = this.props;
        if (sections && sections.length > 0) {
            return (
                <List ref='dialogList' >
                    {sections.map((section, index) => {
                        let checked = false;
                        if (this.props.article.sections && this.props.article.sections.length > 0) {
                            this.props.article.sections.map(articleSection => articleSection.id === section.id && articleSection.name === section.name ? checked = true : checked);
                        }
                        return (
                            <ListItem key={index} primaryText={section.name} leftCheckbox={<Checkbox defaultChecked={checked} onCheck={this.onCheckHandler.bind(null, index) } />} />
                        );
                    }) }
                </List>
            );
        } else {
            return <div><br/><br/><br/></div>;
        }
    };

    showAddSectionDialog = () => {
        return (this.props.callAddSectionDialog === true && this.state.dialogOpen === false) ? true :
            (this.props.callAddSectionDialog === false && this.state.dialogOpen) ? true : false;
    }

    render() {
        const {searchText, alertOpen} = this.state;

        return (
            <div>
                <Dialog
                    title={i18n.t('edit-page.content.sections.addSection') }
                    actions={[<FlatButton label={i18n.t('edit-page.content.sections.save-close') } primary={true} onClick={this.showDialog} />]}
                    open={this.showAddSectionDialog() }
                    onRequestClose={this.showDialog}
                    autoScrollBodyContent={true}
                    style={{ height: '1550px', maxHeight: '1550px' }} ><br/>
                    <Subheader><em>{i18n.t('edit-page.content.sections.createNew') }</em></Subheader>

                    <span className='new-section' style={{ paddingLeft: 16 }}>{i18n.t('edit-page.content.sections.newSection') }</span>
                    <AutoComplete
                        hintText={i18n.t('edit-page.content.sections.placeholder') }
                        dataSource={this.checkSections() }
                        ref='sectionList'
                        onUpdateInput={this.onChangeHandler}
                        searchText={searchText}
                        style={{ paddingLeft: '16px' }}
                        />
                    <FlatButton label={i18n.t('button.add') } onClick={this.updateArticle} /><br/><br/>
                    <Subheader><em>{i18n.t('edit-page.content.sections.existingSections') }</em></Subheader>
                    {this.showAllSections() }
                </Dialog>

                <Dialog open={alertOpen} onRequestClose={this.showDeleteAlert} actions={[
                    <FlatButton label={i18n.t('edit-page.content.sections.cancel-delete') } primary={true} onClick={this.showDeleteAlert} />,
                    <FlatButton label={i18n.t('edit-page.content.sections.confirm-delete') } primary={true} onClick={this.removeSectionClickHandler} />
                ]}>
                    {i18n.t('edit-page.content.sections.alert-delete') }
                </Dialog>
                {this.showPrimarySectionList() }
                {this.showSecondarySectionList() }
            </div>
        );
    }
}
