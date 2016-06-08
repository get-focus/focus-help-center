import {Component} from 'react';
import i18n from 'i18next';

export class EditCartridgeContent extends Component<any, any> {

    state = {
        titleEditable: false,
        descriptionEditable: false
    };

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    // Changes the title editable state
    titleClickHandler() {
        const {titleEditable} = this.state;
        this.setState({ titleEditable: !titleEditable ? true : false });
    }

    // Display the title zone
    renderTitleZone() {
        const {titleEditable} = this.state;
        if (!titleEditable) {
            return (
                <h4 className='edit-cartridge-title' onClick={this.titleClickHandler.bind(this) }>{i18n.t('edit-cartridge.content.title')}</h4>
            );
        } else {
            return (
                <div>
                    <div className='mdl-textfield mdl-js-textfield edit-cartridge-title'>
                        <input className='mdl-textfield__input edit-cartridge-title' type='text' id='sample1' autoFocus/>
                        <label className='mdl-textfield__label edit-cartridge-title' htmlFor='sample1'>{i18n.t('edit-cartridge.input.title')}</label>
                    </div>
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect' onClick={this.titleClickHandler.bind(this)}>
                        {i18n.t('button.save')}
                    </div>
                </div>
            );
        }
    }

    // Changes the desicription editable state
    descriptionClickHandler() {
        const {descriptionEditable} = this.state;
        this.setState({ descriptionEditable: !descriptionEditable ? true : false });
    }

    // Display the title zone
    renderDescriptionZone() {
        const {descriptionEditable} = this.state;
        if (!descriptionEditable) {
            return (
                <h4 className='edit-cartridge-description' onClick={this.descriptionClickHandler.bind(this) }>{i18n.t('edit-cartridge.content.description')}</h4>
            );
        } else {
            return (
                <div>
                    <div className='mdl-textfield mdl-js-textfield edit-cartridge-description'>
                        <textarea
                            className='mdl-textfield__input edit-cartridge-description'
                            id='textarea'
                            autoFocus
                            />
                        <label
                            className='mdl-textfield__label edit-cartridge-description'
                            htmlFor='textarea'
                            >
                            {i18n.t('edit-cartridge.input.description')}
                        </label>
                    </div>
                    <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-description' onClick={this.descriptionClickHandler.bind(this)}>
                        {i18n.t('button.save')}
                    </div>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                {this.renderTitleZone() }
                {this.renderDescriptionZone() }
            </div>
        );
    }
}
