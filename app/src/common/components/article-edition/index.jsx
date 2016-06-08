// IMPORTS
import {Component} from 'react';
import {Link} from 'react-router';
import {ContentArea} from './content-area';

export class EditPage extends Component {

    state = {
        isVisible: false
    };

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    parameterButtonHandler() {
        const {isVisible} = this.state;
        this.setState({isVisible: isVisible ? false : true});
    }

    render() {
        const {isVisible} = this.state;
        return (
            <div>
                <div className='edit-page-container'>
                    <div className='edit-header-item'>
                        Header
                    </div>
                </div>

                <div className='edit-page-container'>
                    <div className={`edit-parameters-item${isVisible ? '' : '-hidden'}`} ref='parametersBloc'>
                        <div className='edit-parameters-bloc'>
                            <h5>PARAMÉTRAGE</h5><br/>
                            <span className='edit-parameters-label'>RUBRIQUES</span>
                            <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                                editer
                            </div><br/>

                            <div className="mdl-textfield mdl-js-textfield">
                                <input className='mdl-textfield__input' type='text' id='sample1' />
                                <label className="mdl-textfield__label" htmlFor="sample1">Rubriques...</label>
                            </div>

                            <br/><br/>
                            <span className='edit-parameters-label'>URL CONTEXTUELLE</span>
                            <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                                editer
                            </div><br/>

                            <div className="mdl-textfield mdl-js-textfield">
                                <input className='mdl-textfield__input' type='text' id='sample1' />
                                <label className="mdl-textfield__label" htmlFor="sample1">URL...</label>
                            </div>

                            <br/><br/>
                            <span className='edit-parameters-label'>BLOC D'INFORMATION CONTEXTUEL</span>
                            <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                                editer
                            </div><br/>

                            <div className="mdl-textfield mdl-js-textfield">
                                <input className='mdl-textfield__input' type='text' id='sample1' />
                                <label className="mdl-textfield__label" htmlFor="sample1">Bloc d'information...</label>
                            </div>
                        </div>
                    </div>

                    <div className='edit-parameters-button-zone'>
                        <button
                        className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect parameters-icon"
                        onClick={this.parameterButtonHandler.bind(this)}
                        >
                            <i className="material-icons">settings</i>
                        </button><br/><br/>
                        <span className={`edit-parameters-text${isVisible ? '-hidden' : ''}`}>PARAMÉTRAGE</span>
                    </div>

                    <div className='edit-zone-item'>
                        <ContentArea />
                    </div>

                    <Link to='#' className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored' >
                        <i className='material-icons'>home</i>
                    </Link>
                </div>
            </div>
        );
    }
}
