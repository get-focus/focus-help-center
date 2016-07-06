import {connect} from 'react-redux';
import * as React from 'react';
import ContentArea from './content-area';
import i18n from 'i18next';
import {loadArticle, clearArticle, manageArticleSection} from '../../actions/article-detail';
import {TextField, FlatButton, IconButton, AutoComplete, List, Subheader, ListItem, Dialog, Checkbox, Divider} from 'material-ui';
import {NavigationClose} from 'material-ui/svg-icons';

import {State} from '../../store/default-state';

export class EditPage extends React.Component<any, any> {
    static propTypes = { id: React.PropTypes.number };

    state = { isVisible: false, searchText: '', dialogOpen: false, alertOpen: false, sectionToDelete: null, sectionToAdd: null, primaryNestedText: 'Show more' };

    componentWillMount() {
        this.props.clearArticle();
        if (this.props.id) {
            this.props.getArticle(this.props.id);
        }
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
        this.props.manageArticleSection('sections', this.props.article.id, sections);
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
        this.props.manageArticleSection('sections', this.props.article.id, list);
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
        this.state.primaryNestedText === 'Show more' ?
            this.setState({ primaryNestedText: 'Show less' }) : this.setState({ primaryNestedText: 'Show more' });
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

    checkSections() {
        if (this.props.article.sections) {
            return this.props.article.sections.map(section => section.name);
        } else {
            return [];
        }
    }

    onCheckHandler = (key, event, checked) => {
        const {sections} = this.props.article;
        const itemList = this.refs['dialogList']['props'].children[1];
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
        if (this.props.article.sections) {
            return sections.map((section, index) => {
                return (
                    <ListItem key={index} primaryText={section.name} leftCheckbox={<Checkbox defaultChecked={true} onCheck={this.onCheckHandler.bind(null, index) } />} />
                );
            });
        }
    };

    render() {
        if (!this.props.connected) {
            return <div />;
        }

        const {isVisible, searchText, dialogOpen, alertOpen} = this.state;
        if (this.refs.primaryNested) {
            this.refs.primaryNested.setState({ isKeyboardFocused: true });
        }
        return (
            <div className='edit-page'>
                <Dialog open={dialogOpen} onRequestClose={this.showDialog} autoScrollBodyContent={true} >
                    <header style={{ position: 'fixed', top: 0, zIndex: 1000, backgroundColor: 'white' }} >
                        <Subheader style={{ marginTop: 24 }} ><em>Entre une nouvelle rubrique ou cochez celle à ajouter</em></Subheader>
                        <AutoComplete
                            hintText='Ajoutez ou recherchez une rubrique'
                            dataSource={this.checkSections() }
                            ref='sectionList'
                            onUpdateInput={this.onChangeHandler}
                            searchText={searchText}
                            />
                        <FlatButton label={i18n.t('button.add') } onClick={this.updateArticle} />
                    </header>
                    <List style={{ position: 'relative', top: 100 }} ref='dialogList' >
                        <Subheader>Toutes les rubriques</Subheader>
                        {this.showAllSection() }
                    </List>
                </Dialog>

                <Dialog open={alertOpen} onRequestClose={this.showDeleteAlert} actions={[
                    <FlatButton
                        label='Annuler'
                        primary={true}
                        onClick={this.showDeleteAlert}
                        />,
                    <FlatButton
                        label='Confirmer'
                        primary={true}
                        onClick={this.removeSectionClickHandler}
                        />
                ]}>
                    Voulez-vous vraiment supprimer cette rubriques?
                </Dialog>

                <div className={`parameter-panel ${isVisible ? '' : 'hidden'}`} ref='parametersBloc'>
                    <h5>PARAMÉTRAGE</h5>

                    <List>
                        <Subheader>Rubriques <FlatButton label={i18n.t('button.add') } onClick={this.showDialog} style={{ float: 'right' }} /></Subheader>
                        {this.showPrimarySectionList() }
                        <Divider />
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
        manageArticleSection: (attribute, article, sections) => dispatch(manageArticleSection(attribute, article, sections))
    })
)(EditPage);
