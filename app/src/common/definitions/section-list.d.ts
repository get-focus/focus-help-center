import {Action} from '../actions';
import {Section} from './section';

/** State spec for the `sectionList` store node. */
export interface SectionListState {
    isLoading?: boolean;
    list?: Section[];
    error?: string;
}

/** Action spec for the `sectionList` store node. */
export interface SectionListAction {
    type: Action;
    list?: Section[];
    error?: string;
}