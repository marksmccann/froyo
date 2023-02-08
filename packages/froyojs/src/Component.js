/* eslint-disable no-console */

import checkPropTypes from 'prop-types/checkPropTypes';

// stores references to component instances
const instances = new Set();

export default class Component {
    static get instances() {
        return Array.from(instances);
    }

    #components = new Map();

    #elements = {};

    #initialized = false;

    #listeners = new Map();

    #observers = new Set();

    #rootElement = null;

    #state = {};

    get components() {
        return Object.fromEntries(this.#components);
    }

    set components(newComponents) {
        Object.entries(newComponents).forEach(([key, value]) => {
            if (!(value instanceof Component)) {
                console.error(
                    `Warning: component "${key}" is not an instance of "Component"`
                );

                return;
            }

            if (this.#components.has(key)) {
                this.#components.get(key).destroy();
            }

            this.#components.set(key, value);
        });
    }

    get displayName() {
        const { name, displayName } = this.constructor;

        return displayName || name;
    }

    get elements() {
        return { ...this.#elements };
    }

    set elements(newElements) {
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

    get listeners() {
        return Object.fromEntries(this.#listeners);
    }

    set listeners(newListeners) {
        Object.entries(newListeners).forEach(([key, value]) => {
            if (typeof value?.destroy !== 'function') {
                console.error(
                    `Warning: listener "${key}" is missing a "destroy" function`
                );

                return;
            }

            if (this.#listeners.has(key)) {
                this.#listeners.get(key).destroy();
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

    constructor(root, initialState = {}) {
        let htmlInitialState = {};
        let rootElement = root;

        if (typeof rootElement === 'string') {
            rootElement = document.body.querySelector(root);
        }

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
                htmlInitialState = JSON.parse(
                    rootElement.getAttribute('data-initial-state')
                );
            } catch {
                console.error(
                    'Warning: "data-initial-state" must contain valid JSON'
                );
            }
        }

        this.#rootElement = rootElement;

        // bind the lifecycle methods to instance
        this.setup = this.setup.bind(this);
        this.validate = this.validate.bind(this);
        this.render = this.render.bind(this);
        this.update = this.update.bind(this);

        // subscribe lifecycle methods to instance
        this.subscribe(this.validate);
        this.subscribe(this.render);
        this.subscribe(this.update);

        // merge and set initial states before setup
        this.setState({ ...htmlInitialState, ...initialState });

        // manually call lifecycle methods for first time
        this.setup();
        this.validate(this.state, {}, this);
        this.render(this.state, {}, this);
        this.update(this.state, {}, this);

        this.#initialized = true;

        instances.add(this);
    }

    destroy() {
        this.#observers.clear();
        this.#listeners.forEach((listener) => listener.destroy());
        this.#components.forEach((component) => component.destroy());
        instances.delete(this);
    }

    setState(newState) {
        const { defaultState = {}, stateTypes = {} } = this.constructor;
        const previousState = this.state;
        const stateChanges = {};

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

    subscribe(observer) {
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

    unsubscribe(observer) {
        if (this.#observers.has(observer)) {
            this.#observers.delete(observer);
        }
    }

    /* eslint-disable class-methods-use-this */

    setup() {}

    validate() {}

    update() {}
}
