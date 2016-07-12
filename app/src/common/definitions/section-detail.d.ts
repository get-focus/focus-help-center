import {Action} from '../actions';
import {Section} from './section';


/** State spec for the `sectionDetail` store node. */
export interface SectionDetailState {
    error?: string;
    section?: Section;
}

/** Action spec for the `sectionDetail` store node. */
export interface SectionDetailAction {
    error?: string;
    section?: Section;
    type: Action;
}