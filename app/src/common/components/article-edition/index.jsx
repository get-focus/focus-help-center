// IMPORTS
import {Component, PropTypes} from 'react';
import {Link} from 'react-router';

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

                <div className='mdl-grid mdl-grid--no-spacing edition-main-grid'>
                    <div className='mdl-cell mdl-cell--2-col-desktop edition-grid'>
                        <h4>Parametrage</h4>
                        Titre
                        <div className='mdl-button mdl-js-button mdl-js-ripple-effect edit-button'>
                            editer
                        </div>

                        <div className="mdl-textfield mdl-js-textfield">
                            <input className='mdl-textfield__input' type='text' id='sample1' />
                            <label className="mdl-textfield__label" htmlFor="sample1">Titre...</label>
                        </div>

                        <br/><br/>
                        <p>Description</p>
                        <div className="mdl-textfield mdl-js-textfield">
                            <input className='mdl-textfield__input' type='text' id='sample1' />
                            <label className="mdl-textfield__label" htmlFor="sample1">Description...</label>
                        </div>
                    </div>

                    <div className='mdl-cell mdl-cell--5-col-desktop edition-grid'>
                        <h4>Zone d'édition</h4>
                        <div className="mdl-textfield mdl-js-textfield text-area-div">
                            <textarea className="mdl-textfield__input" type="text" rows= "30" id="textArea" ></textarea>
                            <label className="mdl-textfield__label" htmlFor="textArea">Zone de texte...</label>
                        </div>
                    </div>

                    <div className='mdl-cell mdl-cell--5-col-desktop edition-grid'>
                        <h4>Preview</h4>
                        <p>here the preview</p>
                    </div>

                </div>
            </div>
        );
    }
}
