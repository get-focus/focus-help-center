// IMPORTS
import {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export const EditPage = React.createClass({
    componentDidMount() {
        componentHandler.upgradeDom();
    },
    render() {
        return (
            <div>
                <Link to='/' className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' >
                    <i className='material-icons'>home</i>
                </Link>

                <div className='mdl-grid'>
                    <div className='mdl-cell mdl-cell--2-col-desktop'>
                        <h4>Parametrage</h4>
                        <p>Title</p>
                        <p>Description</p>
                    </div>

                    <div className='mdl-cell mdl-cell--5-col-desktop'>
                        <h4>Edition zone</h4>

                        <div>
                            <textarea className="mdl-textfield__input" type="text" id="text-zone" ref='textArea'></textarea>
                            <label className="mdl-textfield__label" htmlFor="text-zone">Text zone..</label>
                        </div>
                    </div>

                    <div className='mdl-cell mdl-cell--5-col-desktop'>
                        <h4>Preview</h4>
                        <p>here the preview</p>
                    </div>

                </div>
            </div>
        );
    }
});