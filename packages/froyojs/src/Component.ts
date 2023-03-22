/* eslint-disable no-console */

import checkPropTypes from 'prop-types/checkPropTypes';

abstract class Component<
    State extends Record<string, any> = {},
    Elements extends Record<
        string,
        null | Node | Array<Node> | NodeList | HTMLCollection
    > = {},
    Listeners extends Record<string, { destroy(): void }> = {},
    Components extends Record<string, Component> = {}
> {
    protected static readonly defaultState?: Record<string, any>;

    protected static readonly displayName?: string;

    protected static readonly stateTypes?: Record<string, any>;

    // @ts-expect-error
    #components: Components = {};

    // @ts-expect-error
    #elements: Elements = {};

    #initialized = false;

    // @ts-expect-error
    #listeners: Listeners = {};

    #observers: Set<
        (stateChanges: Partial<State>, previousState: State) => void
    > = new Set();

    #rootElement: HTMLElement;

    #state!: State;

    protected get components(): Components {
        return { ...this.#components };
    }

    protected set components(components: Components) {
        const valid = Object.entries(components).every(([key, value]) => {
            if (!(value instanceof Component)) {
                console.error(
                    `Warning: component "${key}" is not an instance of "Component"`
                );

                return false;
            }

            return true;
        });

        if (valid) this.#components = { ...components };
    }

    public get displayName() {
        const Subclass = this.constructor as typeof Component;
        const { name, displayName } = Subclass;

        return displayName || name;
    }

    protected get elements(): Elements {
        return { ...this.#elements };
    }

    protected set elements(elements: Elements) {
        this.#elements = { ...elements };
    }

    protected get listeners(): Listeners {
        return { ...this.#listeners };
    }

    protected set listeners(listeners: Listeners) {
        const valid = Object.entries(listeners).every(([key, value]) => {
            if (typeof value?.destroy !== 'function') {
                console.error(
                    `Warning: listener "${key}" is missing a "destroy" function`
                );

                return false;
            }

            return true;
        });

        if (valid) this.#listeners = { ...listeners };
    }

    protected get initialized() {
        return this.#initialized;
    }

    public get rootElement() {
        return this.#rootElement;
    }

    public get state(): State {
        return { ...this.#state };
    }

    protected set state(state: State) {
        if (this.initialized) {
            console.error(
                'Warning: state can only be updated via "setState" after initialization'
            );

            return;
        }

        this.setState(state);
    }

    constructor(
        root: string | HTMLElement,
        initialState: Record<string, any> = {}
    ) {
        let htmlInitialState: Record<string, any> = {};
        let rootElement: HTMLElement | null = null;

        if (typeof root === 'string') {
            rootElement = document.body.querySelector(root);
        } else if (root instanceof HTMLElement) {
            rootElement = root;
        }

        if (rootElement instanceof HTMLElement) {
            this.#rootElement = rootElement;
        } else {
            throw new Error(
                'Warning: the root element must be an HTML element'
            );
        }

        // retrieve initial state properties from the HTML
        if (rootElement.hasAttribute('data-initial-state')) {
            try {
                htmlInitialState = JSON.parse(
                    rootElement.getAttribute('data-initial-state') || ''
                );
            } catch {
                console.error(
                    'Warning: "data-initial-state" must contain valid JSON'
                );
            }
        }

        // merge and set initial states before setup
        this.setState({ ...htmlInitialState, ...initialState } as State);

        if (this.setup) {
            this.setup();
        }

        if (this.validate) {
            this.subscribe(this.validate.bind(this));
            this.validate.call(this, this.state, this.state);
        }

        if (this.render) {
            this.subscribe(this.render.bind(this));
            this.render.call(this, this.state, this.state);
        }

        if (this.update !== undefined) {
            this.subscribe(this.update.bind(this));
            this.update.call(this, this.state, this.state);
        }

        this.#initialized = true;
    }

    public destroy() {
        this.#observers.clear();
        Object.values(this.#listeners).forEach((listener) => {
            listener.destroy();
        });
        Object.values(this.#components).forEach((component) => {
            component.destroy();
        });
    }

    public setState(newState: Partial<State>) {
        const Subclass = this.constructor as typeof Component;
        const { defaultState = {}, stateTypes = {} } = Subclass;
        const previousState = this.state;
        const stateChanges: Record<string, any> = {};

        // identify state properties that have changed
        Object.entries(newState).forEach(([key, value]) => {
            if (value !== previousState[key]) {
                stateChanges[key] = value;
            }
        });

        if (Object.keys(stateChanges).length > 0 || !this.initialized) {
            const nextState: Record<string, any> = {
                ...previousState,
                ...stateChanges,
            };

            // default states that are "undefined"
            Object.keys(defaultState).forEach((key) => {
                if (typeof nextState[key] === 'undefined') {
                    nextState[key] = defaultState[key];
                }
            });

            // validate data types of state in non-production
            if (process.env.NODE_ENV !== 'production') {
                checkPropTypes(
                    stateTypes,
                    nextState,
                    'state',
                    this.displayName
                );
            }

            // update the state
            this.#state = nextState as State;

            // notify observers if initialized
            if (this.initialized) {
                this.#observers.forEach((observer) => {
                    observer.call(
                        this,
                        stateChanges as Partial<State>,
                        previousState
                    );
                });
            }
        }
    }

    public subscribe(
        observer: (stateChanges: Partial<State>, previousState: State) => void
    ) {
        if (typeof observer !== 'function') {
            console.error(
                'Warning: a function must be provided to "subscribe"'
            );

            return;
        }

        if (!this.#observers.has(observer)) {
            this.#observers.add(observer);
        }
    }

    public unsubscribe(
        observer: (stateChanges: Partial<State>, previousState: State) => void
    ) {
        if (this.#observers.has(observer)) {
            this.#observers.delete(observer);
        }
    }

    protected render?(stateChanges: Partial<State>, previousState: State): void;

    protected setup?(): void;

    protected update?(stateChanges: Partial<State>, previousState: State): void;

    protected validate?(
        stateChanges: Partial<State>,
        previousState: State
    ): void;
}

export default Component;
