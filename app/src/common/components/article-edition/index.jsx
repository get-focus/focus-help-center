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
                <Link to='/' className='mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored' >
                    <i className='material-icons'>home</i>
                </Link>

                <div className='mdl-grid mdl-grid--no-spacing edit-main-grid'>

                    <div className='mdl-cell mdl-cell--2-col-desktop edit-grid edit-grid-parameters'>
                        <span className='edit-span-parameters'>Titre</span>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            editer
                        </div>

                        <div className="mdl-textfield mdl-js-textfield">
                            <input className='mdl-textfield__input' type='text' id='sample1' />
                            <label className="mdl-textfield__label" htmlFor="sample1">Titre...</label>
                        </div>

                        <br/><br/>
                        <span className='edit-span-parameters'>Description</span>
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            editer
                        </div>

                        <div className="mdl-textfield mdl-js-textfield">
                            <input className='mdl-textfield__input' type='text' id='sample1' />
                            <label className="mdl-textfield__label" htmlFor="sample1">Description...</label>
                        </div>
                    </div>

                    <div className='mdl-cell mdl-cell--10-col-desktop edit-grid'>
                        <ContentArea />
                    </div>
                </div>
            </div>
        );
    }
}
