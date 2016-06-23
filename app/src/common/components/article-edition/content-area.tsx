import {Component} from 'react';
import Markdown from 'remarkable';
import i18n from 'i18next';
import {connect} from 'react-redux';
import {updateArticle} from '../../actions/article-detail';
import {withRouter} from 'react-router';
import {RaisedButton, TextField, LinearProgress} from 'material-ui';
import {State} from '../../store/default-state';

@connect(
    (state: State) => ({
        content: state.articleDetail.article.content,
        connected: state.login.isConnected,
        loading: state.articleDetail.isLoading,
        error: state.articleDetail.error
    }),
    dispatch => ({updateArticle: (content, successHandler) => dispatch(updateArticle('content', content, successHandler))})
)
class ContentArea extends Component<any, any> {
    state = {content: this.props.content};

    md = new Markdown({linkTarget: '_blank'});
    timer: number;

    getRowNumber = () => {
        const textField = this.refs['content-area-textarea'] as Element;
        if (textField) {
            return Math.round(textField.clientHeight / 25) - 2;
        } else {
            return 10;
        }
    }

    handleChange = () => {
        const content = this.refs['textarea']['getValue']();
        this.setState({content});
        clearTimeout(this.timer);
        this.timer = setTimeout(this.save, 5000);
    }

    rawMarkup = () => ({__html: this.md.render(this.state.content)});
    save = () => {
        clearTimeout(this.timer);
        this.props.updateArticle(this.state.content, () => this.props.router.push(''));
    };

    componentWillMount() {
        window.addEventListener('resize', () => this.forceUpdate());
    }

    componentWillReceiveProps({content}) {
        this.setState({content});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.forceUpdate());
    }

    render() {
        return (
            <div className='content'>
                <div className='header'>
                    <div className='edit'>
                        {this.props.loading ?
                            <LinearProgress style={{marginTop: '18px', height: '2px'}} />
                        : this.props.error ?
                            <div className='error save-text'><i className='material-icons'>error</i><div>{this.props.error}</div></div>
                        : this.state.content !== this.props.content ?
                            <RaisedButton
                                primary={true}
                                className='save-button'
                                onClick={this.save}
                                label={i18n.t('button.save')}
                            />
                        : <div className='save-text'>{i18n.t('edit-cartridge.content.upToDate')}</div>
                    }
                    </div>
                    <div className='preview'>
                        <h5>{i18n.t('content-area.preview')}</h5>
                    </div>
                </div>
                <div className='workspace'>
                    <div className='textarea' ref='content-area-textarea'>
                        <TextField
                            ref='textarea'
                            multiLine={true}
                            fullWidth={true}
                            hintText={i18n.t('article-edit.content.placeholder')}
                            value={this.state.content}
                            onChange={this.handleChange}
                            rowsMax={this.getRowNumber()}
                            rows={this.getRowNumber()}
                        />
                    </div>
                    <div
                        className='display'
                        dangerouslySetInnerHTML={this.rawMarkup()}
                    />
                </div>
            </div>
        );
    }
}

export default withRouter(ContentArea);
