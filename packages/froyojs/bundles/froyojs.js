(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.froyojs = {}));
})(this, (function (exports) { 'use strict';

    const COMPONENT = Symbol('component');

    const ERRORS = {
        E01: 'Invalid node: failed to add attributes to node "{{ name }}". Expected an object',
        E02: 'Invalid node: failed to add attribute "{{ attribute }}" of unknown type "{{ type }}" to node "{{ name }}"',
        E03: 'Invalid node: failed to add classes to node "{{ name }}". Expected an object',
        E04: 'Invalid node: failed to add content to node "{{ name }}". Expected a string or object',
        E05: 'Invalid node: failed to add style to node "{{ name }}". Expected an object',
        E06: 'Invalid node: failed to add style "{{ property }}" of unknown type "{{ type }}" to node "{{ name }}"',
        E07: 'Invalid node: failed to apply styles to node "{{ name }}" because it is not an HTML element',
        E08: 'Invalid node: failed to render element "{{ name }}". Expected a string or object',
        E09: 'Invalid node: failed to render text node "{{ name }}". Expected a string',
        E10: 'Invalid event: unable to add "{{ type }}" event to "{{ name }}". Expected function',
        E11: 'Invalid state: missing required property: {{ property }}',
        E12: 'Invalid state: type check failed for "{{ property }}". Expected "{{ type }}"',
        E13: 'Initializer: unable to find component "{{ name }}"',
        E14: 'Initializer: "{{ name }}" is not a valid component constructor',
        E15: '{{ name }}: the "data-state" attribute must contain valid JSON',
        E16: '{{ name }}: missing required node "{{ property }}". No element was found with selector "{{ selector }}"',
        E17: '{{ name }}: missing required node "{{ property }}". No elements were found with selector "{{ selector }}"',
        E18: '{{ name }}: found unknown event option: "{{ property }}"',
        E19: '{{ name }}: found unknown hook option: "{{ property }}"',
        E20: '{{ name }}: found unknown render option: "{{ property }}"',
        E21: '{{ name }}: cannot set readonly state "{{ property }}"',
        E22: '{{ name }}: failed to set unknown state "{{ property }}"',
        E23: '{{ name }}: failed to subscribe to unknown state property "{{ property }}"',
        E24: '{{ name }}: failed to subscribe to "{{ property }}". Expected a function',
        E25: '{{ name }}: failed to unsubscribe from unknown state property "{{ property }}"',
        E26: '{{ name }}: failed to unsubscribe from "{{ property }}". Expected a function',
        E27: '{{ name }}: found invalid component option "{{ property }}. Expected a valid component constructor."',
        E28: '{{ name }}: found invalid method option "{{ property }}. Expected a function"',
        E29: '{{ name }}: failed to subscribe to "{{ property }}" on component "{{ component }}". Expected a function.',
    };
    function getErrorMessage(name, tokens) {
        let message = ERRORS[name];
        if (tokens) {
            Object.entries(tokens).forEach(([key, value]) => {
                message = message.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), value);
            });
        }
        return message;
    }
    function logError(name, tokens) {
        {
            console.error(getErrorMessage(name, tokens));
        }
    }

    function attachEvents(name, target, events) {
        const cleanup = new Set();
        Object.entries(events).forEach(([type, handler]) => {
            const options = /^(focus|blur)$/.test(type);
            if (typeof handler === 'function') {
                target.addEventListener(type, handler, options);
                cleanup.add(() => {
                    target.removeEventListener(type, handler, options);
                });
            }
            else {
                logError('E10', { type, name });
            }
        });
        return () => {
            cleanup.forEach((removeEventListener) => removeEventListener());
        };
    }

    function isObject(value) {
        return typeof value === 'object' && !Array.isArray(value) && value !== null;
    }
    function setElementAttributes(name, element, attributes) {
        if (isObject(attributes)) {
            Object.entries(attributes).forEach(([attribute, value]) => {
                if (typeof value === 'string') {
                    element.setAttribute(attribute, value);
                }
                else if (value === null) {
                    element.removeAttribute(attribute);
                }
                else if (typeof value === 'boolean') {
                    if (value) {
                        element.setAttribute(attribute, '');
                    }
                    else {
                        element.removeAttribute(attribute);
                    }
                }
                else if (value !== undefined) {
                    logError('E02', { name, attribute, type: typeof value });
                }
            });
        }
        else if (attributes !== undefined) {
            logError('E01', { name });
        }
    }
    function setElementClasses(name, element, classes) {
        if (isObject(classes)) {
            Object.entries(classes).forEach(([key, value]) => {
                if (value) {
                    element.classList.add(key);
                }
                else {
                    element.classList.remove(key);
                }
            });
        }
        else if (classes !== undefined) {
            logError('E03', { name });
        }
    }
    function setElementContent(name, element, content) {
        if (typeof content === 'string') {
            if (element.innerHTML !== content) {
                element.innerHTML = content;
            }
        }
        else if (content !== undefined) {
            logError('E04', { name });
        }
    }
    function setElementStyle(name, element, style) {
        if (element instanceof HTMLElement) {
            if (typeof style === 'object' && style !== null) {
                Object.entries(style).forEach(([property, value]) => {
                    if (typeof value === 'string') {
                        element.style.setProperty(property, value);
                    }
                    else if (value === null) {
                        element.style.removeProperty(property);
                    }
                    else if (value !== undefined) {
                        logError('E06', {
                            name,
                            property,
                            type: typeof value,
                        });
                    }
                });
            }
            else if (style !== undefined) {
                logError('E05', { name });
            }
        }
        else {
            logError('E07', { name });
        }
    }
    function renderText(name, node, value) {
        if (typeof value === 'string') {
            if (node.nodeValue !== value) {
                node.nodeValue = value;
            }
        }
        else {
            logError('E09', { name });
        }
    }
    function renderElement(name, element, options) {
        if (typeof options === 'string') {
            setElementContent(name, element, options);
        }
        else if (isObject(options)) {
            setElementAttributes(name, element, options.attributes);
            setElementClasses(name, element, options.classes);
            setElementContent(name, element, options.content);
            setElementStyle(name, element, options.style);
        }
        else {
            logError('E08', { name });
        }
    }
    function renderNode(name, render) {
        const node = this[name];
        const isArray = Array.isArray(node);
        let nodes = [];
        if (isArray) {
            nodes = node;
        }
        else if (node !== null) {
            nodes.push(node);
        }
        nodes.forEach((target, index) => {
            const position = isArray ? index : undefined;
            const result = render.call(this, position);
            if (target instanceof Text) {
                renderText(name, target, result);
            }
            else {
                renderElement(name, target, result);
            }
        });
    }

    const simpleTypes = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
    const mainTypes = /^(String|Number|Boolean|Function|Symbol|BigInt|Object|Array|null)$/;
    function getType(value) {
        let typeName = '';
        if (value) {
            const match = value.toString().match(/^\s*(function|class) (\w+)/);
            typeName = match ? match[2] : '';
        }
        return typeName;
    }
    function checkStateType(property, value, option) {
        const { type, required } = option;
        if (required && value === undefined) {
            logError('E11', { property });
        }
        else if (value !== undefined && value !== null) {
            const expectedType = getType(type);
            const matchesType = typeof value === expectedType.toLowerCase();
            if ((simpleTypes.test(expectedType) && !matchesType) ||
                (expectedType === 'Object' && typeof value !== 'object') ||
                (expectedType === 'Array' && !Array.isArray(value)) ||
                (type && !mainTypes.test(expectedType) && !(value instanceof type))) {
                logError('E12', { property, type: expectedType });
            }
        }
    }

    function defineComponent(options) {
        var _a;
        const cleanupTasks = new Set();
        const stateHooks = new Map();
        const renderTasks = new Set();
        const componentInstances = new Set();
        const observers = new Set();
        const $this = {};
        let ready = false;
        const $options = {
            name: options.name || 'Unnamed component',
            state: options.state || {},
            nodes: options.nodes || {},
            methods: options.methods || {},
            components: options.components || {},
            events: options.events || {},
            render: options.render || {},
            hooks: options.hooks || {},
        };
        $this.$state = new Proxy({}, {
            set(target, property, value) {
                const previousValue = target[property];
                let hasChanged = value !== previousValue;
                let nextValue = value;
                if (nextValue === undefined) {
                    nextValue = $options.state[property].default;
                    hasChanged = nextValue !== previousValue;
                }
                {
                    if (!ready || (ready && hasChanged)) {
                        checkStateType(property, nextValue, $options.state[property]);
                    }
                }
                target[property] = nextValue;
                if (ready && hasChanged) {
                    const stateHook = stateHooks.get(property);
                    renderTasks.forEach(([name, render]) => {
                        renderNode.call($this, name, render);
                    });
                    if (stateHook) {
                        stateHook.call($this, value, previousValue);
                    }
                    observers.forEach(([name, observer]) => {
                        if (property === name) {
                            observer.call(undefined, value, previousValue);
                        }
                    });
                }
                if (!ready || (ready && hasChanged)) {
                    componentInstances.forEach(([name, instance]) => {
                        const { state } = $options.components[name].call($this);
                        if (state)
                            instance.setState(state);
                    });
                }
                return true;
            },
        });
        return _a = class Component {
                static get displayName() {
                    return $options.name;
                }
                get root() {
                    return $this.$root;
                }
                get state() {
                    return { ...$this.$state };
                }
                constructor(root, state = {}) {
                    let rootElement = null;
                    let htmlState = {};
                    if (typeof root === 'string') {
                        rootElement = document.querySelector(root);
                    }
                    else if (root instanceof Element) {
                        rootElement = root;
                    }
                    if (rootElement) {
                        $this.$root = rootElement;
                    }
                    else {
                        throw new Error(`${$options.name}: the component root must be a valid HTML element`);
                    }
                    try {
                        const value = rootElement.getAttribute('data-state');
                        if (value !== null) {
                            htmlState = JSON.parse(value);
                        }
                    }
                    catch {
                        logError('E15', { name: $options.name });
                    }
                    Object.entries($options.state).forEach(([property, option]) => {
                        let value;
                        if (property in htmlState)
                            value = htmlState[property];
                        if (property in state)
                            value = state[property];
                        if (value !== undefined && option.readonly) {
                            logError('E21', { name: $options.name, property });
                        }
                        else {
                            $this.$state[property] = value;
                        }
                    });
                    Object.entries($options.nodes).forEach(([property, option]) => {
                        const { type } = option;
                        let node = null;
                        if (type === 'text') {
                            node = document.createTextNode(option.value || '');
                        }
                        else if (type === 'element' && option.tagName) {
                            const { className, attributes = {}, content } = option;
                            node = document.createElement(option.tagName);
                            if (className)
                                node.classList.add(className);
                            if (content)
                                node.innerHTML = content;
                            Object.entries(attributes).forEach((entry) => {
                                node.setAttribute(...entry);
                            });
                        }
                        else if (type === 'svg' && option.tagName) {
                            const { className, attributes = {}, content } = option;
                            node = document.createElementNS('http://www.w3.org/2000/svg', option.tagName);
                            if (className)
                                node.classList.add(className);
                            if (content)
                                node.innerHTML = content;
                            Object.entries(attributes).forEach((entry) => {
                                node.setAttribute(...entry);
                            });
                        }
                        else if (type === 'query' && option.selector) {
                            const { selector, optional } = option;
                            let scope = $this.$root;
                            if (option.scope) {
                                scope = option.scope($this.$root);
                            }
                            node = scope.querySelector(selector);
                            if (!node && !optional) {
                                logError('E16', {
                                    name: $options.name,
                                    property,
                                    selector,
                                });
                            }
                        }
                        else if (type === 'query-all' && option.selector) {
                            const { selector, optional } = option;
                            let scope = $this.$root;
                            if (option.scope) {
                                scope = option.scope($this.$root);
                            }
                            node = Array.from(scope.querySelectorAll(selector));
                            if (node.length === 0 && !optional) {
                                logError('E17', {
                                    name: $options.name,
                                    property,
                                    selector,
                                });
                            }
                        }
                        else if (type === 'custom' &&
                            typeof option.node === 'function') {
                            const customNode = option.node.call(undefined, $this.$root);
                            if (customNode instanceof NodeList ||
                                customNode instanceof HTMLCollection) {
                                node = Array.from(customNode);
                            }
                            else {
                                node = customNode;
                            }
                        }
                        $this[property] = node;
                    });
                    Object.entries($options.methods).forEach(([property, option]) => {
                        if (typeof option === 'function') {
                            $this[property] = option.bind($this);
                        }
                        else {
                            logError('E28', { name: $options.name, property });
                        }
                    });
                    Object.entries($options.components).forEach(([property, option]) => {
                        const config = option.call($this);
                        const { constructor, subscribe } = config;
                        if (constructor.$$typeof === COMPONENT) {
                            const instance = new constructor(config.root, config.state);
                            if (subscribe) {
                                Object.entries(subscribe).forEach(([name, callback]) => {
                                    if (callback) {
                                        instance.subscribe(name, callback);
                                    }
                                    else {
                                        logError('E29', {
                                            name: $options.name,
                                            component: constructor.displayName,
                                            property,
                                        });
                                    }
                                });
                            }
                            componentInstances.add([property, instance]);
                            cleanupTasks.add(() => instance.destroy());
                        }
                        else {
                            logError('E27', { name: $options.name, property });
                        }
                    });
                    Object.entries($options.events).forEach(([property, option]) => {
                        let targets = [];
                        const node = $this[property];
                        if (property === '$window') {
                            targets.push(window);
                        }
                        else if (property === '$document') {
                            targets.push(document);
                        }
                        else if (Array.isArray(node)) {
                            targets = node;
                        }
                        else if (node) {
                            targets.push(node);
                        }
                        else {
                            logError('E18', { name: $options.name, property });
                        }
                        targets.forEach((target, index) => {
                            let events;
                            if (Array.isArray(node)) {
                                events = option.call($this, index);
                            }
                            else {
                                events = option.call($this);
                            }
                            cleanupTasks.add(attachEvents(property, target, events));
                        });
                    });
                    Object.entries($options.hooks).forEach(([property, option]) => {
                        if (property === '$setup') {
                            option.call($this);
                        }
                        else if (property === '$teardown') {
                            cleanupTasks.add(option.bind($this));
                        }
                        else if (property in $options.state) {
                            const value = $this.$state[property];
                            stateHooks.set(property, option);
                            option.call($this, value, value);
                        }
                        else {
                            logError('E19', { name: $options.name, property });
                        }
                    });
                    Object.entries($options.render).forEach(([property, option]) => {
                        if (property in $this) {
                            renderTasks.add([property, option]);
                            renderNode.call($this, property, option);
                        }
                        else {
                            logError('E20', { name: $options.name, property });
                        }
                    });
                    ready = true;
                }
                destroy() {
                    cleanupTasks.forEach((cleanup) => cleanup());
                }
                setState(stateChanges) {
                    Object.entries(stateChanges).forEach(([property, value]) => {
                        if (property in $options.state) {
                            if ($options.state[property].readonly) {
                                logError('E21', { name: $options.name, property });
                            }
                            else {
                                $this.$state[property] = value;
                            }
                        }
                        else {
                            logError('E22', { name: $options.name, property });
                        }
                    });
                }
                subscribe(property, observer) {
                    const name = String(property);
                    if (!(property in $options.state)) {
                        logError('E23', { name: $options.name, property: name });
                        return;
                    }
                    if (typeof observer !== 'function') {
                        logError('E24', { name: $options.name, property: name });
                        return;
                    }
                    const result = Array.from(observers).find((entry) => entry[0] === property && entry[1] === observer);
                    if (!result) {
                        observers.add([property, observer]);
                    }
                }
                unsubscribe(property, observer) {
                    const name = String(property);
                    if (!(property in $options.state)) {
                        logError('E25', { name: $options.name, property: name });
                        return;
                    }
                    if (typeof observer !== 'function') {
                        logError('E26', { name: $options.name, property: name });
                        return;
                    }
                    const result = Array.from(observers).find((entry) => entry[0] === property && entry[1] === observer);
                    if (result) {
                        observers.delete(result);
                    }
                }
            },
            _a.$$typeof = COMPONENT,
            _a;
    }

    function createInitializer(componentList) {
        return function initialize() {
            const rootElements = document.querySelectorAll('[data-init]');
            const instances = [];
            rootElements.forEach((rootElement) => {
                const name = rootElement.getAttribute('data-init') || '';
                const Constructor = componentList[name];
                if (!(name in componentList)) {
                    logError('E13', { name });
                    return;
                }
                if (Constructor.$$typeof !== COMPONENT) {
                    logError('E14', { name });
                    return;
                }
                rootElement.removeAttribute('data-initialize');
                instances.push(new Constructor(rootElement));
            });
            return instances;
        };
    }

    exports.createInitializer = createInitializer;
    exports.defineComponent = defineComponent;

}));
