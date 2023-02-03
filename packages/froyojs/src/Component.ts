/* eslint-disable no-console */

import { checkPropTypes } from 'prop-types';

export default class Component {
    ['constructor']: {
        name: string;
        displayName: string;
        defaultState: { [key: string]: string };
        stateTypes: { [key: string]: unknown };
    }

    #components: Map<string, Component> = new Map();

    #initialized = false;

    #listeners: Map<string, FroyoComponentListener> = new Map();

    #observers: Set<FroyoComponentObserver> = new Set();

    #state: FroyoComponentState = {};

    #rootElement: HTMLElement;

    get components() {
        return Object.fromEntries(this.#components);
    }

    set components(newComponents: { [key: string]: Component }) {
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

    get displayName(): string {
        const { name, displayName } = this.constructor;

        return displayName ?? name;
    }

    get instances() {
        return Array.from(this.#instances);
    }

    get listeners() {
        return Object.fromEntries(this.#listeners);
    }

    set listeners(newListeners: { [key: string]: FroyoComponentListener }) {
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

    get initialized() {
        return this.#initialized;
    }

    get rootElement() {
        return this.#rootElement;
    }

    get state() {
        return { ...this.#state };
    }

    set state(newState) {
        if (this.initialized) {
            console.error(
                'Warning: state can only be updated via "setState" after initialization'
            );

            return;
        }

        this.setState(newState);
    }

    constructor(rootElement: HTMLElement, initialState = {}) {
        let htmlInitialState: FroyoComponentState = {};

        if (!(rootElement instanceof Element)) {
            console.error('Warning: the root element must be an HTML element');
            return;
        }

        if (!this.render) {
            console.error('Warning: components must have a "render" method');
            return;
        }

        // retrieve initial state properties from the HTML
        if (rootElement.hasAttribute('data-initial-state')) {
            try {
                /* eslint-disable @typescript-eslint/no-unsafe-assignment */
                htmlInitialState = JSON.parse(rootElement.dataset.initialState ?? '');
                /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            } catch {
                console.error(
                    'Warning: "data-initial-state" must contain valid JSON'
                );
            }
        }

        this.#rootElement = rootElement;

        // merge the initial states and update before initialize
        this.setState({ ...htmlInitialState, ...initialState });

        // initialize component
        this.initialize();

        // bind the lifecycle methods to instance
        this.initialize = this.initialize.bind(this);
        this.validate = this.validate.bind(this);
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);

        // subscribe lifecycle methods to instance
        this.subscribe(this.validate);
        this.subscribe(this.render);
        this.subscribe(this.update);

        // manually call lifecycle methods for first time
        this.validate(this.state, {}, this);
        this.render(this.state, {}, this);
        this.update(this.state, {}, this);

        this.#initialized = true;
        this.#instances 
    }

    destroy() {
        this.#observers.clear();
        this.#listeners.forEach((listener) => listener.destroy());
        this.#components.forEach((component) => component.destroy());
    }

    setState(newState: FroyoComponentState) {
        const { displayName, defaultState = {}, stateTypes = {} } = this.constructor;
        const previousState = this.state;
        const stateChanges: FroyoComponentState = {};

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
                /* eslint-disable @typescript-eslint/no-unsafe-call */
                checkPropTypes(
                    stateTypes,
                    nextState,
                    'state',
                    displayName,
                );
                /* eslint-enable @typescript-eslint/no-unsafe-call */
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

    subscribe(observer: FroyoComponentObserver): void {
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

    unsubscribe(observer: FroyoComponentObserver): void {
        if (this.#observers.has(observer)) {
            this.#observers.delete(observer);
        }
    }

    /* eslint-disable class-methods-use-this */

    initialize(): void {}

    render: FroyoComponentObserver;

    update: FroyoComponentObserver = () => {}

    validate: FroyoComponentObserver = () => {}
}
