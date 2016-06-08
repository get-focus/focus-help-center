// IMPORTS
import {Component} from 'react';
import {Link} from 'react-router';
import {ContentArea} from './content-area';

export class EditPage extends Component {
    componentDidMount() {
        componentHandler.upgradeDom();
    }

    render() {
        return (
            <div>
                <div className='edit-page-container'>
                    <div className='edit-header-item'>
                        Header
                    </div>
                </div>

                <div className='edit-page-container'>
                    <div className='edit-parameters-item'>
                        <h5>PARAMÉTRAGE
                            <button className="mdl-button mdl-js-button mdl-button--icon edit-button">
                                <i className="material-icons">settings</i>
                            </button>
                        </h5><br/>

                        <span className='edit-span-parameters'>Titre</span>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            editer
                        </div><br/>

                        <div className="mdl-textfield mdl-js-textfield">
                            <input className='mdl-textfield__input' type='text' id='sample1' />
                            <label className="mdl-textfield__label" htmlFor="sample1">Titre...</label>
                        </div>

                        <br/><br/>
                        <span className='edit-span-parameters'>Description</span>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            editer
                        </div><br/>

                        <div className="mdl-textfield mdl-js-textfield">
                            <input className='mdl-textfield__input' type='text' id='sample1' />
                            <label className="mdl-textfield__label" htmlFor="sample1">Description...</label>
                        </div>
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
