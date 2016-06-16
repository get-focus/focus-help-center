/** Enum of all possible action types. */
export enum Action {
    REQUEST_LOGIN,
    RECEIVE_LOGIN,
    FAILURE_LOGIN,
    CLEAR_ERROR_LOGIN,

    REQUEST_ARTICLE_LIST,
    SUCCESS_ARTICLE_LIST,
    FAILURE_ARTICLE_LIST,
    UPDATE_ARTICLE_LIST_FILTER,

    UPDATE_ARTICLE,
    REQUEST_ACTION_ARTICLE,
    SUCCESS_LOAD_ARTICLE,
    SUCCESS_SAVE_ARTICLE,
    SUCCESS_DELETE_ARTICLE,
    ERROR_ACTION_ARTICLE,
    CLEAR_ARTICLE
}
