/* eslint-disable no-console */

import checkPropTypes from 'prop-types/checkPropTypes';

interface FroyoState {
    [key: string]: any;
}

interface FroyoListener {
    destroy(): void;
}

type FroyoObserver = (
    stateChanges?: FroyoState,
    previousState?: FroyoState,
    instance?: Component
) => void;

type FroyoElement = null | Node | Array<Node | null>;

// stores references to component instances
const instances: Set<Component> = new Set();

abstract class Component {
    static defaultState?: FroyoState;

    static displayName?: string;

    static stateTypes?: { [key: string]: any };

    static get instances() {
        return Array.from(instances);
    }

    #components: Map<string, Component> = new Map();

    #elements: { [key: string]: FroyoElement } = {};

    #initialized: boolean = false;

    #listeners: Map<string, FroyoListener> = new Map();

    #observers: Set<FroyoObserver> = new Set();

    #rootElement: Element;

    #state: FroyoState = {};

    protected get components() {
        return Object.fromEntries(this.#components);
    }

    protected set components(newComponents: { [key: string]: Component }) {
        Object.entries(newComponents).forEach(([key, value]) => {
            if (!(value instanceof Component)) {
                console.error(
                    `Warning: component "${key}" is not an instance of "Component"`
                );

                return;
            }

            if (this.#components.has(key)) {
                this.#components.get(key)?.destroy();
            }

            this.#components.set(key, value);
        });
    }

    public get displayName() {
        const { name, displayName } = this.constructor as typeof Component;

        return displayName || name;
    }

    protected get elements() {
        return { ...this.#elements };
    }

    protected set elements(newElements: {
        [key: string]: FroyoElement | NodeList | HTMLCollection;
    }) {
        Object.entries(newElements).forEach(([key, value]) => {
            if (value instanceof Node || value === null) {
                this.#elements[key] = value;
                return;
            }

            if (value instanceof NodeList || value instanceof HTMLCollection) {
                this.#elements[key] = Array.from(value);
                return;
            }

            console.error(
                `Warning: value assigned to "elements.${key}" is not a valid DOM node`
            );
        });
    }

    protected get listeners() {
        return Object.fromEntries(this.#listeners);
    }

    protected set listeners(newListeners: { [key: string]: FroyoListener }) {
        Object.entries(newListeners).forEach(([key, value]) => {
            if (typeof value?.destroy !== 'function') {
                console.error(
                    `Warning: listener "${key}" is missing a "destroy" function`
                );

                return;
            }

            if (this.#listeners.has(key)) {
                this.#listeners.get(key)?.destroy();
            }

            this.#listeners.set(key, value);
        });
    }

    protected get initialized() {
        return this.#initialized;
    }

    public get rootElement() {
        return this.#rootElement;
    }

    public get state() {
        return { ...this.#state };
    }

    protected set state(newState) {
        if (this.initialized) {
            console.error(
                'Warning: state can only be updated via "setState" after initialization'
            );

            return;
        }

        this.setState(newState);
    }

    constructor(root: string | Element, initialState: FroyoState = {}) {
        let htmlInitialState: FroyoState = {};
        let rootElement: Element | null = null;

        if (typeof root === 'string') {
            rootElement = document.body.querySelector(root);
        } else if (root instanceof Element) {
            rootElement = root;
        }

        if (rootElement instanceof Element) {
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
        this.state = { ...htmlInitialState, ...initialState };

        if (this.setup) {
            this.setup();
        }

        if (this.validate) {
            this.subscribe(this.validate.bind(this));
            this.validate(this.state, {}, this);
        }

        if (this.render) {
            this.subscribe(this.render.bind(this));
            this.render(this.state, {}, this);
        }

        if (this.update !== undefined) {
            this.subscribe(this.update.bind(this));
            this.update(this.state, {}, this);
        }

        this.#initialized = true;

        instances.add(this);
    }

    public destroy() {
        this.#observers.clear();
        this.#listeners.forEach((listener) => listener.destroy());
        this.#components.forEach((component) => component.destroy());
        instances.delete(this);
    }

    public setState(newState: FroyoState) {
        const { defaultState = {}, stateTypes = {} } = this
            .constructor as typeof Component;
        const previousState = this.state;
        const stateChanges: FroyoState = {};

        // identify state properties that have changed
        Object.entries(newState).forEach(([key, value]) => {
            if (value !== previousState[key]) {
                stateChanges[key] = value;
            }
        });

        if (Object.keys(stateChanges).length > 0 || !this.initialized) {
            const nextState = { ...previousState, ...stateChanges };

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
            this.#state = nextState;

            // notify observers if initialized
            if (this.initialized) {
                this.#observers.forEach((observer) => {
                    observer(stateChanges, previousState, this);
                });
            }
        }
    }

    public subscribe(observer: FroyoObserver) {
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

    public unsubscribe(observer: FroyoObserver) {
        if (this.#observers.has(observer)) {
            this.#observers.delete(observer);
        }
    }

    protected render?(
        stateChanges?: FroyoState,
        previousState?: FroyoState,
        instance?: Component
    ): void;

    protected setup?(
        stateChanges?: FroyoState,
        previousState?: FroyoState,
        instance?: Component
    ): void;

    protected validate?(
        stateChanges?: FroyoState,
        previousState?: FroyoState,
        instance?: Component
    ): void;

    protected update?(
        stateChanges?: FroyoState,
        previousState?: FroyoState,
        instance?: Component
    ): void;
}

export default Component;
