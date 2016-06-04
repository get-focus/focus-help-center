/** Chai extension for redux-actions-assertion */
declare namespace Chai {

    interface LanguageChains {
        dispatch: Assertion;
    }

    interface Assertion {
        actions(actions: {type: any} | {type: any}[], callback: MochaDone): void
    }
}