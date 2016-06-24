import * as React from 'react';
import {ArticleList} from '../list';
import {ArticleLine} from '../line';
import {CircularProgress} from 'material-ui';

import {shallow} from 'enzyme';

describe('Article List', () => {
    describe('Loading', () => {
        let component = shallow(<ArticleList articleList={{isLoading: true}} connected={true} openCreate={() => null} />);

        it('should have an active spinner', () => {
            chai.expect(component.find(CircularProgress)).to.have.length(1);
        });

        it('shouldn\'t display an error', () => {
            chai.expect(component.find('.error')).to.have.length(0);
        });

        it('shouldn\'t display any lines', () => {
            chai.expect(component.find(ArticleLine)).to.have.length(0);
        });
    });
    describe('Error', () => {
        let component = shallow(<ArticleList articleList={{error: 'error'}} connected={true} openCreate={() => null} />);

        it('shouldn\'t have an active spinner', () => {
            chai.expect(component.find('.is-active')).to.have.length(0);
        });

        it('should display an error', () => {
            chai.expect(component.find('.error')).to.have.length(1);
        });

        it('shouldn\'t display any lines', () => {
            chai.expect(component.find(ArticleLine)).to.have.length(0);
        });
    });
    describe('Lines', () => {
        let component = shallow(<ArticleList articleList={{list: [{title: 't', description: 't', content: 't', published: true}, {title: '1', description: '1', content: '1', published: true}]}} connected={true} openCreate={() => null} />);

        it('shouldn\'t have an active spinner', () => {
            chai.expect(component.find('.is-active')).to.have.length(0);
        });

        it('shouldn\'t display an error', () => {
            chai.expect(component.find('.error')).to.have.length(0);
        });

        it('should display two lines', () => {
            chai.expect(component.find(ArticleLine)).to.have.length(2);
        });
    });
});
