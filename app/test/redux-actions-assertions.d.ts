/** Chai extension for redux-actions-assertion */
declare namespace Chai {

    interface LanguageChains {
        dispatch: Assertion;
    }

    interface Assertion {
        actions(actions: {} | {}[], callback: MochaDone): void
        state(state: {}): Assertion;
    }
}