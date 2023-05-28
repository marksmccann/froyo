/* eslint-disable class-methods-use-this */

import type {
    ComponentOptions,
    ComponentConstructor,
    ComponentInstance,
    ComponentThis,
    ComponentNode,
    ComponentNormalizedOptions,
    ComponentStateHook,
    ComponentObserver,
} from './types';
import { COMPONENT } from './constants';
import attachEvents from './attachEvents';
import renderNode from './renderNode';
import checkStateType from './checkStateType';
import logError from './logError';

/**
 * Defines a new Froyo component
 * @param options configuration options
 */
function defineComponent<T extends ComponentThis = ComponentThis>(
    options: ComponentOptions<T>
): ComponentConstructor<ComponentInstance<T>> {
    const cleanupTasks: Set<() => void> = new Set();
    const stateHooks: Map<string, ComponentStateHook<any>> = new Map();
    const renderTasks: Set<
        [string, ComponentNormalizedOptions['render'][string]]
    > = new Set();
    const componentInstances: Set<[string, ComponentInstance<any>]> = new Set();
    const observers: Set<[keyof T['$state'], ComponentObserver<any>]> =
        new Set();
    const $this = {} as ComponentThis;
    let ready = false;

    // normalize the options
    const $options = {
        name: options.name || 'Unnamed component',
        state: options.state || {},
        nodes: options.nodes || {},
        methods: options.methods || {},
        components: options.components || {},
        events: options.events || {},
        render: options.render || {},
        hooks: options.hooks || {},
    } as ComponentNormalizedOptions;

    // create the reactive state proxy
    $this.$state = new Proxy({} as ComponentThis['$state'], {
        set(target, property: string, value) {
            const previousValue = target[property];
            let hasChanged = value !== previousValue;
            let nextValue = value;

            if (nextValue === undefined) {
                nextValue = $options.state[property].default;
                hasChanged = nextValue !== previousValue;
            }

            if (process.env.NODE_ENV !== 'production') {
                if (!ready || (ready && hasChanged)) {
                    checkStateType(
                        property,
                        nextValue,
                        $options.state[property]
                    );
                }
            }

            /* eslint-disable no-param-reassign */
            target[property] = nextValue;
            /* eslint-enable no-param-reassign */

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

                    if (state) instance.setState(state);
                });
            }

            return true;
        },
    });

    return class Component implements ComponentInstance<T> {
        static readonly $$typeof = COMPONENT;

        static get displayName() {
            return $options.name;
        }

        public get root(): T['$root'] {
            return $this.$root;
        }

        public get state(): T['$state'] {
            return { ...$this.$state };
        }

        constructor(root: Element | string, state: Partial<T['$state']> = {}) {
            let rootElement: Element | null = null;
            let htmlState: Record<string, any> = {};

            if (typeof root === 'string') {
                rootElement = document.querySelector(root);
            } else if (root instanceof Element) {
                rootElement = root as Element;
            }

            if (rootElement) {
                $this.$root = rootElement;
            } else if (process.env.NODE_ENV === 'production') {
                throw new Error('An unknown error has ocurred');
            } else {
                throw new Error(
                    `${$options.name}: the component root must be a valid HTML element`
                );
            }

            try {
                const value = rootElement.getAttribute('data-state');

                if (value !== null) {
                    htmlState = JSON.parse(value);
                }
            } catch {
                logError('E15', { name: $options.name });
            }

            Object.entries($options.state).forEach(([property, option]) => {
                let value: any;

                if (property in htmlState) value = htmlState[property];
                if (property in state) value = state[property];

                if (value !== undefined && option.readonly) {
                    logError('E21', { name: $options.name, property });
                } else {
                    $this.$state[property] = value;
                }
            });

            Object.entries($options.nodes).forEach(([property, option]) => {
                const { type } = option;
                let node: ComponentNode = null;

                if (type === 'text') {
                    node = document.createTextNode(option.value || '');
                } else if (type === 'element' && option.tagName) {
                    const { className, attributes = {}, content } = option;

                    node = document.createElement(option.tagName);

                    if (className) node.classList.add(className);
                    if (content) node.innerHTML = content;

                    Object.entries(attributes).forEach((entry) => {
                        (node as Element).setAttribute(...entry);
                    });
                } else if (type === 'svg' && option.tagName) {
                    const { className, attributes = {}, content } = option;

                    node = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        option.tagName
                    );

                    if (className) node.classList.add(className);
                    if (content) node.innerHTML = content;

                    Object.entries(attributes).forEach((entry) => {
                        (node as Element).setAttribute(...entry);
                    });
                } else if (type === 'query' && option.selector) {
                    const { selector, optional } = option;
                    let scope: ReturnType<NonNullable<typeof option.scope>> =
                        $this.$root;

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
                } else if (type === 'query-all' && option.selector) {
                    const { selector, optional } = option;
                    let scope: ReturnType<NonNullable<typeof option.scope>> =
                        $this.$root;

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
                } else if (
                    type === 'custom' &&
                    typeof option.node === 'function'
                ) {
                    const customNode = option.node.call(undefined, $this.$root);

                    if (
                        customNode instanceof NodeList ||
                        customNode instanceof HTMLCollection
                    ) {
                        node = Array.from(customNode);
                    } else {
                        node = customNode;
                    }
                }

                $this[property] = node;
            });

            Object.entries($options.methods).forEach(([property, option]) => {
                if (typeof option === 'function') {
                    $this[property] = option.bind($this);
                } else {
                    logError('E28', { name: $options.name, property });
                }
            });

            Object.entries($options.components).forEach(
                ([property, option]) => {
                    const config = option.call($this);
                    const { constructor, subscribe } = config;

                    if (constructor.$$typeof === COMPONENT) {
                        const instance = new constructor(
                            config.root,
                            config.state
                        );

                        if (subscribe) {
                            Object.entries(subscribe).forEach(
                                ([name, callback]) => {
                                    if (callback) {
                                        instance.subscribe(name, callback);
                                    } else {
                                        logError('E29', {
                                            name: $options.name,
                                            component: constructor.displayName,
                                            property,
                                        });
                                    }
                                }
                            );
                        }

                        componentInstances.add([property, instance]);
                        cleanupTasks.add(() => instance.destroy());
                    } else {
                        logError('E27', { name: $options.name, property });
                    }
                }
            );

            Object.entries($options.events).forEach(([property, option]) => {
                let targets: Parameters<typeof attachEvents>[1][] = [];
                const node = $this[property] as ComponentNode;

                if (property === '$window') {
                    targets.push(window);
                } else if (property === '$document') {
                    targets.push(document);
                } else if (Array.isArray(node)) {
                    targets = node;
                } else if (node) {
                    targets.push(node);
                } else {
                    logError('E18', { name: $options.name, property });
                }

                targets.forEach((target, index) => {
                    let events: ReturnType<typeof option>;

                    if (Array.isArray(node)) {
                        events = option.call($this, index);
                    } else {
                        events = option.call($this);
                    }

                    cleanupTasks.add(attachEvents(property, target, events));
                });
            });

            Object.entries($options.hooks).forEach(([property, option]) => {
                if (property === '$setup') {
                    option.call($this);
                } else if (property === '$teardown') {
                    cleanupTasks.add(option.bind($this));
                } else if (property in $options.state) {
                    const value = $this.$state[property];

                    stateHooks.set(property, option);
                    option.call($this, value, value);
                } else {
                    logError('E19', { name: $options.name, property });
                }
            });

            Object.entries($options.render).forEach(([property, option]) => {
                if (property in $this) {
                    renderTasks.add([property, option]);
                    renderNode.call($this, property, option);
                } else {
                    logError('E20', { name: $options.name, property });
                }
            });

            ready = true;
        }

        public destroy(): void {
            cleanupTasks.forEach((cleanup) => cleanup());
        }

        public setState(stateChanges: Partial<T['$state']>): void {
            Object.entries(stateChanges).forEach(([property, value]) => {
                if (property in $options.state) {
                    if ($options.state[property].readonly) {
                        logError('E21', { name: $options.name, property });
                    } else {
                        $this.$state[property] = value;
                    }
                } else {
                    logError('E22', { name: $options.name, property });
                }
            });
        }

        public subscribe<K extends keyof T['$state']>(
            property: K,
            observer: ComponentObserver<T['$state'][K]>
        ): void {
            const name = String(property);

            if (!(property in $options.state)) {
                logError('E23', { name: $options.name, property: name });
                return;
            }

            if (typeof observer !== 'function') {
                logError('E24', { name: $options.name, property: name });
                return;
            }

            const result = Array.from(observers).find(
                (entry) => entry[0] === property && entry[1] === observer
            );

            if (!result) {
                observers.add([property, observer]);
            }
        }

        public unsubscribe<K extends keyof T['$state']>(
            property: K,
            observer: ComponentObserver<T['$state'][K]>
        ): void {
            const name = String(property);

            if (!(property in $options.state)) {
                logError('E25', { name: $options.name, property: name });
                return;
            }

            if (typeof observer !== 'function') {
                logError('E26', { name: $options.name, property: name });
                return;
            }

            const result = Array.from(observers).find(
                (entry) => entry[0] === property && entry[1] === observer
            );

            if (result) {
                observers.delete(result);
            }
        }
    };
}

export default defineComponent;
