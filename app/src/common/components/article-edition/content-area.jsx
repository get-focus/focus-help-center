import {Component, PropTypes} from 'react';
import Markdown from 'remarkable';
import i18n from 'i18next';

export class ContentArea extends Component {
    static propTypes = {
        value: PropTypes.string,
        onChange: PropTypes.func.isRequired
    };

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    state = {};
    md = new Markdown();
    handleChange = () => {
        const value = this.refs.textarea.value;
        this.setState({value});
        this.props.onChange(value);
    }
    rawMarkup = () => ({__html: this.md.render(this.state.value)});

    render() {
        return (
            <div className='content-area'>
                <div className="mdl-textfield mdl-js-textfield content-area-textarea">
                    <textarea
                        ref='textarea'
                        className="mdl-textfield__input"
                        defaultValue={this.props.value}
                        onChange={this.handleChange}
                        id="textarea"
                    />
                    <label
                        className="mdl-textfield__label"
                        htmlFor="textarea"
                    >
                        {i18n.t('article-edit.content.placeholder')}
                    </label>
                </div>
                <div
                    className='content-area-display'
                    dangerouslySetInnerHTML={this.rawMarkup()}
                />
            </div>
        );
    }
}
