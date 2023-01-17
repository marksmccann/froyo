import loglevel from 'loglevel';
import { nanoid } from 'nanoid';
import checkPropTypes from 'prop-types/checkPropTypes';

export default class Component {
    #components = new Map();

    #listeners = new Map();

    #metadata = {};

    #observers = new Set();

    #rootElement = null;

    #state = {};

    get components() {
        return Object.from(this.#components);
    }

    set components(newComponents) {
        Object.entries(newComponents).forEach(([key, value]) => {
            if (!(value instanceof Component)) {
                loglevel.error(
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

        return displayName ?? name;
    }

    get listeners() {
        return Object.from(this.#listeners);
    }

    set listeners(newListeners) {
        Object.entries(newListeners).forEach(([key, value]) => {
            if (typeof value.destroy !== 'function') {
                loglevel.error(
                    `Warning: listener "${key}" is missing a "destroy" method`
                );
                return;
            }

            if (this.#listeners.has(key)) {
                this.#listeners.get(key).destroy();
            }

            this.#listeners.set(key, value);
        });
    }

    get metadata() {
        return { ...this.#metadata };
    }

    get rootElement() {
        return this.#rootElement;
    }

    get state() {
        return { ...this.#state };
    }

    set state(newState) {
        if (this.#metadata.initialized) {
            loglevel.error(
                'Warning: state can only be updated via "setState" after initialization'
            );
            return;
        }

        this.setState(newState);
    }

    constructor(rootElement, initialState = {}) {
        let htmlInitialState = {};

        if (!(rootElement instanceof HTMLElement)) {
            loglevel.error('Warning: the root element must be an HTML element');
            return;
        }

        // retrieve initial state properties from the HTML
        if (rootElement.hasAttribute('data-initial-state')) {
            try {
                htmlInitialState = JSON.parse(
                    rootElement.getAttribute('data-initial-state')
                );
            } catch {
                loglevel.error(
                    'Warning: expected the value of "data-initial-state" to be valid JSON'
                );
            }
        }

        this.#rootElement = rootElement;
        this.#metadata = { initialized: false, id: nanoid(8) };

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

        // rootElement.setAttribute('data-initialized');
        this.#metadata = { initialized: true };
    }

    destroy() {
        this.#observers.clear();
        this.#listeners.forEach((listener) => listener.destroy());
        this.#components.forEach((component) => component.destroy());
    }

    setState(newState) {
        const { defaultState = {}, stateTypes = {} } = this.constructor;
        const { initialized } = this.metadata;
        const previousState = this.state;
        const stateChanges = {};

        // identify state properties that have changed
        Object.entries(newState).forEach(([key, value]) => {
            if (value !== previousState[key]) {
                stateChanges[key] = value;
            }
        });

        if (Object.keys(stateChanges).length > 0 || !initialized) {
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
            if (initialized) {
                this.#observers.forEach((observer) => {
                    observer(stateChanges, previousState, this);
                });
            }
        }
    }

    subscribe(observer) {
        if (typeof observer !== 'function') {
            loglevel.error(
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

    initialize() {}

    validate() {}

    render() {}

    update() {}
}
