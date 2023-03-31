(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.froyojs = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }

    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    /**
     * Copyright (c) 2013-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */

    var ReactPropTypesSecret_1;
    var hasRequiredReactPropTypesSecret;

    function requireReactPropTypesSecret () {
    	if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
    	hasRequiredReactPropTypesSecret = 1;

    	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

    	ReactPropTypesSecret_1 = ReactPropTypesSecret;
    	return ReactPropTypesSecret_1;
    }

    var has$1;
    var hasRequiredHas;

    function requireHas () {
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

    var printWarning = function() {};

    {
      var ReactPropTypesSecret = requireReactPropTypesSecret();
      var loggedTypeFailures = {};
      var has = requireHas();

      printWarning = function(text) {
        var message = 'Warning: ' + text;
        if (typeof console !== 'undefined') {
          console.error(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) { /**/ }
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
                var err = Error(
                  (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                  'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
                  'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
                );
                err.name = 'Invariant Violation';
                throw err;
              }
              error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
            } catch (ex) {
              error = ex;
            }
            if (error && !(error instanceof Error)) {
              printWarning(
                (componentName || 'React class') + ': type specification of ' +
                location + ' `' + typeSpecName + '` is invalid; the type checker ' +
                'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
                'You may have forgotten to pass an argument to the type checker ' +
                'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
                'shape all require an argument).'
              );
            }
            if (error instanceof Error && !(error.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error.message] = true;

              var stack = getStack ? getStack() : '';

              printWarning(
                'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
              );
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
    checkPropTypes.resetWarningCache = function() {
      {
        loggedTypeFailures = {};
      }
    };

    var checkPropTypes_1 = checkPropTypes;

    var checkPropTypes$1 = checkPropTypes_1;

    var _Component_components, _Component_elements, _Component_initialized, _Component_listeners, _Component_observers, _Component_rootElement, _Component_state;
    class Component {
        get components() {
            return { ...__classPrivateFieldGet(this, _Component_components, "f") };
        }
        set components(components) {
            const valid = Object.entries(components).every(([key, value]) => {
                if (!(value instanceof Component)) {
                    console.error(`Warning: component "${key}" is not an instance of "Component"`);
                    return false;
                }
                return true;
            });
            if (valid)
                __classPrivateFieldSet(this, _Component_components, { ...components }, "f");
        }
        get displayName() {
            const Subclass = this.constructor;
            const { name, displayName } = Subclass;
            return displayName || name;
        }
        get elements() {
            return { ...__classPrivateFieldGet(this, _Component_elements, "f") };
        }
        set elements(elements) {
            __classPrivateFieldSet(this, _Component_elements, { ...elements }, "f");
        }
        get listeners() {
            return { ...__classPrivateFieldGet(this, _Component_listeners, "f") };
        }
        set listeners(listeners) {
            const valid = Object.entries(listeners).every(([key, value]) => {
                if (typeof value?.destroy !== 'function') {
                    console.error(`Warning: listener "${key}" is missing a "destroy" function`);
                    return false;
                }
                return true;
            });
            if (valid)
                __classPrivateFieldSet(this, _Component_listeners, { ...listeners }, "f");
        }
        get initialized() {
            return __classPrivateFieldGet(this, _Component_initialized, "f");
        }
        get rootElement() {
            return __classPrivateFieldGet(this, _Component_rootElement, "f");
        }
        get state() {
            return { ...__classPrivateFieldGet(this, _Component_state, "f") };
        }
        set state(state) {
            if (this.initialized) {
                console.error('Warning: state can only be updated via "setState" after initialization');
                return;
            }
            this.setState(state);
        }
        constructor(root, initialState = {}) {
            _Component_components.set(this, {});
            _Component_elements.set(this, {});
            _Component_initialized.set(this, false);
            _Component_listeners.set(this, {});
            _Component_observers.set(this, new Set());
            _Component_rootElement.set(this, void 0);
            _Component_state.set(this, void 0);
            let htmlInitialState = {};
            let rootElement = null;
            if (typeof root === 'string') {
                rootElement = document.body.querySelector(root);
            }
            else if (root instanceof HTMLElement) {
                rootElement = root;
            }
            if (rootElement instanceof HTMLElement) {
                __classPrivateFieldSet(this, _Component_rootElement, rootElement, "f");
            }
            else {
                throw new Error('Warning: the root element must be an HTML element');
            }
            if (rootElement.hasAttribute('data-initial-state')) {
                try {
                    htmlInitialState = JSON.parse(rootElement.getAttribute('data-initial-state') || '');
                }
                catch {
                    console.error('Warning: "data-initial-state" must contain valid JSON');
                }
            }
            this.setState({ ...htmlInitialState, ...initialState });
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
            __classPrivateFieldSet(this, _Component_initialized, true, "f");
        }
        destroy() {
            __classPrivateFieldGet(this, _Component_observers, "f").clear();
            Object.values(__classPrivateFieldGet(this, _Component_listeners, "f")).forEach((listener) => {
                listener.destroy();
            });
            Object.values(__classPrivateFieldGet(this, _Component_components, "f")).forEach((component) => {
                component.destroy();
            });
        }
        setState(newState) {
            const Subclass = this.constructor;
            const { defaultState = {}, stateTypes = {} } = Subclass;
            const previousState = this.state;
            const stateChanges = {};
            Object.entries(newState).forEach(([key, value]) => {
                if (value !== previousState[key]) {
                    stateChanges[key] = value;
                }
            });
            if (Object.keys(stateChanges).length > 0 || !this.initialized) {
                const nextState = {
                    ...previousState,
                    ...stateChanges,
                };
                Object.keys(defaultState).forEach((key) => {
                    if (typeof nextState[key] === 'undefined') {
                        nextState[key] = defaultState[key];
                    }
                });
                {
                    checkPropTypes$1(stateTypes, nextState, 'state', this.displayName);
                }
                __classPrivateFieldSet(this, _Component_state, nextState, "f");
                if (this.initialized) {
                    __classPrivateFieldGet(this, _Component_observers, "f").forEach((observer) => {
                        observer.call(this, stateChanges, previousState);
                    });
                }
            }
        }
        subscribe(observer) {
            if (typeof observer !== 'function') {
                console.error('Warning: a function must be provided to "subscribe"');
                return;
            }
            if (!__classPrivateFieldGet(this, _Component_observers, "f").has(observer)) {
                __classPrivateFieldGet(this, _Component_observers, "f").add(observer);
            }
        }
        unsubscribe(observer) {
            if (__classPrivateFieldGet(this, _Component_observers, "f").has(observer)) {
                __classPrivateFieldGet(this, _Component_observers, "f").delete(observer);
            }
        }
    }
    _Component_components = new WeakMap(), _Component_elements = new WeakMap(), _Component_initialized = new WeakMap(), _Component_listeners = new WeakMap(), _Component_observers = new WeakMap(), _Component_rootElement = new WeakMap(), _Component_state = new WeakMap();

    function createInitializer(componentList) {
        return function initialize() {
            const rootElements = document.querySelectorAll('[data-initialize]');
            const instances = [];
            rootElements.forEach((rootElement) => {
                const name = rootElement.getAttribute('data-initialize');
                if (name &&
                    name in componentList &&
                    componentList[name].prototype instanceof Component) {
                    rootElement.removeAttribute('data-initialize');
                    instances.push(new componentList[name](rootElement));
                }
                else {
                    console.error(`Warning: "${name}" is not a valid "Component" constructor`);
                }
            });
            return instances;
        };
    }

    function addEventListener(target, type, listener, options) {
        target.addEventListener(type, listener, options);
        return {
            destroy() {
                target.removeEventListener(type, listener, options);
            },
        };
    }

    function createMutationObserver(target, callback, options) {
        const observer = new MutationObserver(callback);
        observer.observe(target, options);
        return {
            observer,
            destroy() {
                observer.disconnect();
            },
        };
    }

    function createMediaQueryListener(query, callback) {
        const media = window.matchMedia(query);
        media.addEventListener('change', callback);
        return {
            media,
            destroy() {
                media.removeEventListener('change', callback);
            },
        };
    }

    function setAttributes(target, attributes = {}) {
        Object.entries(attributes).forEach(([key, value]) => {
            if (value === null) {
                target.removeAttribute(key);
            }
            else if (value !== undefined) {
                target.setAttribute(key, value);
            }
        });
    }

    function createElement(tag, attributes, children = '') {
        const element = document.createElement(tag);
        if (attributes) {
            setAttributes(element, attributes);
        }
        if (typeof children === 'string') {
            element.innerHTML = children;
        }
        else {
            element.appendChild(children);
        }
        return element;
    }

    function setClasses(target, classes) {
        Object.entries(classes).forEach((entry) => {
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
