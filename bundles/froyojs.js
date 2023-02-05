(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.froyojs = {}));
})(this, (function (exports) { 'use strict';

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
    return _classApplyDescriptorGet(receiver, descriptor);
  }
  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
    _classApplyDescriptorSet(receiver, descriptor, value);
    return value;
  }
  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
  }
  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }
    return descriptor.value;
  }
  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }
      descriptor.value = value;
    }
  }
  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }
  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);
    privateMap.set(obj, value);
  }

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
  if (process.env.NODE_ENV !== 'production') {
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
    if (process.env.NODE_ENV !== 'production') {
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
    if (process.env.NODE_ENV !== 'production') {
      loggedTypeFailures = {};
    }
  };
  var checkPropTypes_1 = checkPropTypes;
  var checkPropTypes$1 = checkPropTypes_1;

  // stores references to component instances
  const instances = new Set();
  var _components = /*#__PURE__*/new WeakMap();
  var _initialized = /*#__PURE__*/new WeakMap();
  var _listeners = /*#__PURE__*/new WeakMap();
  var _observers = /*#__PURE__*/new WeakMap();
  var _rootElement = /*#__PURE__*/new WeakMap();
  var _state = /*#__PURE__*/new WeakMap();
  class Component {
    static get instances() {
      return Array.from(instances);
    }
    get components() {
      return Object.fromEntries(_classPrivateFieldGet(this, _components));
    }
    set components(newComponents) {
      Object.entries(newComponents).forEach(_ref => {
        let [key, value] = _ref;
        if (!(value instanceof Component)) {
          console.error(`Warning: component "${key}" is not an instance of "Component"`);
          return;
        }
        if (_classPrivateFieldGet(this, _components).has(key)) {
          _classPrivateFieldGet(this, _components).get(key).destroy();
        }
        _classPrivateFieldGet(this, _components).set(key, value);
      });
    }
    get displayName() {
      const {
        name,
        displayName
      } = this.constructor;
      return displayName || name;
    }
    get listeners() {
      return Object.fromEntries(_classPrivateFieldGet(this, _listeners));
    }
    set listeners(newListeners) {
      Object.entries(newListeners).forEach(_ref2 => {
        let [key, value] = _ref2;
        if (typeof value?.destroy !== 'function') {
          console.error(`Warning: listener "${key}" is missing a "destroy" function`);
          return;
        }
        if (_classPrivateFieldGet(this, _listeners).has(key)) {
          _classPrivateFieldGet(this, _listeners).get(key).destroy();
        }
        _classPrivateFieldGet(this, _listeners).set(key, value);
      });
    }
    get initialized() {
      return _classPrivateFieldGet(this, _initialized);
    }
    get rootElement() {
      return _classPrivateFieldGet(this, _rootElement);
    }
    get state() {
      return {
        ..._classPrivateFieldGet(this, _state)
      };
    }
    set state(newState) {
      if (this.initialized) {
        console.error('Warning: state can only be updated via "setState" after initialization');
        return;
      }
      this.setState(newState);
    }
    constructor(root) {
      let initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classPrivateFieldInitSpec(this, _components, {
        writable: true,
        value: new Map()
      });
      _classPrivateFieldInitSpec(this, _initialized, {
        writable: true,
        value: false
      });
      _classPrivateFieldInitSpec(this, _listeners, {
        writable: true,
        value: new Map()
      });
      _classPrivateFieldInitSpec(this, _observers, {
        writable: true,
        value: new Set()
      });
      _classPrivateFieldInitSpec(this, _rootElement, {
        writable: true,
        value: null
      });
      _classPrivateFieldInitSpec(this, _state, {
        writable: true,
        value: {}
      });
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
      _classPrivateFieldSet(this, _rootElement, rootElement);

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
      _classPrivateFieldSet(this, _initialized, true);
      instances.add(this);
    }
    destroy() {
      _classPrivateFieldGet(this, _observers).clear();
      _classPrivateFieldGet(this, _listeners).forEach(listener => listener.destroy());
      _classPrivateFieldGet(this, _components).forEach(component => component.destroy());
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
      Object.entries(newState).forEach(_ref3 => {
        let [key, value] = _ref3;
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
        if (process.env.NODE_ENV !== 'production') {
          checkPropTypes$1(stateTypes, nextState, 'state', this.displayName);
        }

        // update the state
        _classPrivateFieldSet(this, _state, nextState);

        // notify observers if initialized
        if (this.initialized) {
          _classPrivateFieldGet(this, _observers).forEach(observer => {
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
      if (!_classPrivateFieldGet(this, _observers).has(observer)) {
        _classPrivateFieldGet(this, _observers).add(observer);
      }
    }
    unsubscribe(observer) {
      if (_classPrivateFieldGet(this, _observers).has(observer)) {
        _classPrivateFieldGet(this, _observers).delete(observer);
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

  function addEventListener(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
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
    Object.entries(attributes ?? {}).forEach(_ref => {
      let [key, value] = _ref;
      if (value === null) {
        target.removeAttribute(key);
      } else if (value !== undefined) {
        target.setAttribute(key, value);
      }
    });
  }

  function createElement(tag, attributes) {
    let children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    const element = document.createElement(tag);
    setAttributes(element, attributes);
    if (typeof children === 'string') {
      element.innerHTML = children;
    } else {
      element.appendChild(children);
    }
    return element;
  }

  function isWithinDepth(child, target, maxDepth) {
    let parent = child.parentElement;
    let level = -1;
    if (maxDepth < 0) {
      return true;
    }
    while (parent && level < maxDepth) {
      if (parent === target) {
        return true;
      }
      level += 1;
      parent = parent.parentElement;
    }
    return false;
  }
  function querySelectorAll(target, query) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      depth = 2
    } = options;
    const elements = Array.from(target.querySelectorAll(query));
    return elements.filter(element => isWithinDepth(element, target, depth));
  }

  function querySelector() {
    return querySelectorAll(...arguments)[0] ?? null;
  }

  exports.Component = Component;
  exports.addEventListener = addEventListener;
  exports.createElement = createElement;
  exports.createInitializer = createInitializer;
  exports.createMediaQueryListener = createMediaQueryListener;
  exports.createMutationObserver = createMutationObserver;
  exports.querySelector = querySelector;
  exports.querySelectorAll = querySelectorAll;
  exports.setAttributes = setAttributes;

}));
