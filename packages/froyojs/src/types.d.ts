/* eslint-disable import/prefer-default-export */

interface FroyoComponentState {
    [key: string]: unknown;
}

interface FroyoComponentListener extends FroyoComponentState {
    destroy(): void;
}

type FroyoComponentObserver = (
    stateChanges: FroyoComponentState,
    previousState: FroyoComponentState,
    instance: Component,
) => void;

declare module 'prop-types/checkPropTypes' {
    export function checkPropTypes(
        typeSpecs: FroyoComponentState,
        values: FroyoComponentState,
        location: string,
        componentName: string,
    ): void
} 
