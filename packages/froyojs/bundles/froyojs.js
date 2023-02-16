(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.froyojs = {}));
})(this, (function (exports) { 'use strict';

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var ReactPropTypesSecret_1;
  var hasRequiredReactPropTypesSecret;
  function requireReactPropTypesSecret() {
    if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
    hasRequiredReactPropTypesSecret = 1;
    var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
    ReactPropTypesSecret_1 = ReactPropTypesSecret;
    return ReactPropTypesSecret_1;
  }

  var has$1;
  var hasRequiredHas;
  function requireHas() {
    if (hasRequiredHas) return has$1;
    hasRequiredHas = 1;
    has$1 = Function.call.bind(Object.prototype.hasOwnProperty);
    return has$1;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  var printWarning = function () {};
  {
    var ReactPropTypesSecret = requireReactPropTypesSecret();
    var loggedTypeFailures = {};
    var has = requireHas();
    printWarning = function (text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {/**/}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;
            var stack = getStack ? getStack() : '';
            printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes.resetWarningCache = function () {
    {
      loggedTypeFailures = {};
    }
  };
  var checkPropTypes_1 = checkPropTypes;
  var checkPropTypes$1 = checkPropTypes_1;

  /* eslint-disable no-console */

  // stores references to component instances
  const instances = new Set();
  class Component {
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
          console.error(`Warning: component "${key}" is not an instance of "Component"`);
          return;
        }
        if (this.#components.has(key)) {
          this.#components.get(key).destroy();
        }
        this.#components.set(key, value);
      });
    }
    get displayName() {
      const {
        name,
        displayName
      } = this.constructor;
      return displayName || name;
    }
    get elements() {
      return {
        ...this.#elements
      };
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
        console.error(`Warning: value assigned to "elements.${key}" is not a valid DOM node`);
      });
    }
    get listeners() {
      return Object.fromEntries(this.#listeners);
    }
    set listeners(newListeners) {
      Object.entries(newListeners).forEach(([key, value]) => {
        if (typeof value?.destroy !== 'function') {
          console.error(`Warning: listener "${key}" is missing a "destroy" function`);
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
      return {
        ...this.#state
      };
    }
    set state(newState) {
      if (this.initialized) {
        console.error('Warning: state can only be updated via "setState" after initialization');
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
          htmlInitialState = JSON.parse(rootElement.getAttribute('data-initial-state'));
        } catch {
          console.error('Warning: "data-initial-state" must contain valid JSON');
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
      this.setState({
        ...htmlInitialState,
        ...initialState
      });

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
      this.#listeners.forEach(listener => listener.destroy());
      this.#components.forEach(component => component.destroy());
      instances.delete(this);
    }
    setState(newState) {
      const {
        defaultState = {},
        stateTypes = {}
      } = this.constructor;
      const previousState = this.state;
      const stateChanges = {};

      // identify state properties that have changed
      Object.entries(newState).forEach(([key, value]) => {
        if (value !== previousState[key]) {
          stateChanges[key] = value;
        }
      });
      if (Object.keys(stateChanges).length > 0 || !this.initialized) {
        const nextState = {
          ...previousState,
          ...stateChanges
        };

        // default states that are "undefined"
        Object.keys(defaultState).forEach(key => {
          if (typeof nextState[key] === 'undefined') {
            nextState[key] = defaultState[key];
          }
        });

        // validate data types of state in non-production
        {
          checkPropTypes$1(stateTypes, nextState, 'state', this.displayName);
        }

        // update the state
        this.#state = nextState;

        // notify observers if initialized
        if (this.initialized) {
          this.#observers.forEach(observer => {
            observer(stateChanges, previousState, this);
          });
        }
      }
    }
    subscribe(observer) {
      if (typeof observer !== 'function') {
        console.error('Warning: a function must be provided to "subscribe"');
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

  /* eslint-disable no-console */
  function createInitializer(componentList) {
    return function initialize() {
      const rootElements = document.querySelectorAll('[data-initialize]');
      const instances = [];
      Array.from(rootElements).forEach(rootElement => {
        const name = rootElement.getAttribute('data-initialize');
        const Constructor = componentList[name];
        if (!(Constructor.prototype instanceof Component)) {
          console.error(`Warning: "${name}" is not a valid "Component" constructor`);
          return;
        }
        rootElement.removeAttribute('data-initialize');
        instances.push(new Constructor(rootElement));
      });
      return instances;
    };
  }

  function addEventListener(target, ...args) {
    target.addEventListener(...args);
    return {
      destroy() {
        target.removeEventListener(...args);
      }
    };
  }

  function createMutationObserver(target, callback, options) {
    const observer = new MutationObserver(callback);
    observer.observe(target, options);
    return {
      observer,
      destroy() {
        observer.disconnect();
      }
    };
  }

  function createMediaQueryListener(query, callback) {
    const media = window.matchMedia(query);
    media.addEventListener('change', callback);
    return {
      media,
      destroy() {
        media.removeEventListener('change', callback);
      }
    };
  }

  function setAttributes(target, attributes) {
    Object.entries(attributes ?? {}).forEach(([key, value]) => {
      if (value === null) {
        target.removeAttribute(key);
      } else if (value !== undefined) {
        target.setAttribute(key, value);
      }
    });
  }

  function createElement(tag, attributes, children = '') {
    const element = document.createElement(tag);
    setAttributes(element, attributes);
    if (typeof children === 'string') {
      element.innerHTML = children;
    } else {
      element.appendChild(children);
    }
    return element;
  }

  function setClasses(target, classes) {
    Object.entries(classes).forEach(entry => {
      target.classList[entry[1] ? 'add' : 'remove'](entry[0]);
    });
  }

  exports.Component = Component;
  exports.addEventListener = addEventListener;
  exports.createElement = createElement;
  exports.createInitializer = createInitializer;
  exports.createMediaQueryListener = createMediaQueryListener;
  exports.createMutationObserver = createMutationObserver;
  exports.setAttributes = setAttributes;
  exports.setClasses = setClasses;

}));
