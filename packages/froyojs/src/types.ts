import Component from './Component';

export type ComponentRoot = string | Element;

export type ComponentState = Record<string, any>;

export type ComponentElement =
    | null
    | Node
    | Array<Node>
    | NodeList
    | HTMLCollection;

export type ComponentElements = Record<string, ComponentElement>;

export type ComponentListener = { destroy(): void };

export type ComponentListeners = Record<string, ComponentListener>;

export type ComponentComponents = Record<string, Component>;

export type ComponentConstructor<C> = {
    new (root: ComponentRoot, initialState?: ComponentState): C;
};

export type ComponentConstructorList<T> = {
    [K in keyof T]: ComponentConstructor<T[K]>;
};

export type ComponentEventListener = ComponentListener & {};

export type ComponentMediaQueryListener = ComponentListener & {
    media: MediaQueryList;
};

export type ComponentMutationObserver = ComponentListener & {
    observer: MutationObserver;
};
