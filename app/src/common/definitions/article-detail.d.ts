import {Action} from '../actions';
import {Article} from './article';

/** Spec for the snackbar action object. */
export interface SnackbarAction {
    message: string;
    actionText?: string;
    actionHandler?: () => void;
}

/** Spec for the snackbar state object. */
interface SnackbarState extends SnackbarAction {
    timeout: number;
}

/** State spec for the `articleDetail` store node. */
export interface ArticleDetailState {
    article?: Article;
    error?: string;
    isEditDescription: boolean;
    isEditTitle: boolean;
    isLoading: boolean;
    showPopup: boolean;
    showEditSnackbar: boolean;
    snackbarData?: SnackbarState;
}

/** Action spec for the `articleDetail` store node. */
export interface ArticleDetailAction {
    type: Action;
    article?: Article;
    error?: string;
    attribute?: string;
    value?: string | boolean;
    snackbarData?: SnackbarAction;
}