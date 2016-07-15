import {connect} from 'react-redux';
import * as React from 'react';
import i18n from 'i18next';
import {manageArticleSection} from '../../actions/article-detail';
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
            this.setState({articleSections: this.props.article.sections});
        }
        if (articleSections !== null && (sections.length !== articleSections.length)) {
            this.setState({articleSections: sections});
            this.props.loadSectionList();
        }
    }

    updateArticle = (section) => {
        const {article} = this.props, {searchText} = this.state;
        let sections = [];

        article.sections.map(section => { sections.push(section); });
        if (searchText.trim() !== '') {
            searchText.split(',').map((value) => { sections.push({ name: value }); });
        }
        if (section.name) {
            sections.push(section);
        }
        this.props.manageArticleSection(article, 'sections', sections);
        this.setState({ searchText: '', articleSections: this.props.article.sections });
    };

    removeSectionClickHandler = () => {
        const {sections} = this.props.article, {sectionToDelete} = this.state;
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
        this.state.alertOpen ? this.setState({ alertOpen: !this.state.alertOpen, sectionToDelete: section }) :
            this.setState({ alertOpen: !this.state.alertOpen, sectionToDelete: section });
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
        return this.props.article.sections ? this.props.article.sections.map(section => section.name) : [];
    }

    onCheckHandler = (key, event, checked) => {
        const {sections} = this.props, itemList = this.refs['dialogList']['props'].children;
        let searchedItem;

        itemList.map((item, index) => {
            if (item.key === key.toString()) {
                searchedItem = item;
                if (checked === false) {
                    this.showDeleteAlert(sections[index]);
                } else if (checked === true) {
                    this.updateArticle(sections[index]);
                }
            }
        });
    }

    showArticleSections = () => {
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
                    actions={[<FlatButton label={i18n.t('edit-page.content.sections.close') } primary={true} onClick={this.showDialog} />]}
                    open={this.showAddSectionDialog() }
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
