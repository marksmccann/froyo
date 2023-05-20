/* eslint-disable class-methods-use-this */

import type {
    ComponentTypes,
    ComponentRoot,
    ComponentOptions,
    ComponentState,
    StateOptionList,
    NodeOptionList,
    DataOptionList,
    ComponentOptionList,
    RenderOption,
    ComponentLifecycleHook,
    ComponentStateHook,
    ComponentInstance,
    ComponentThis,
    ComponentObserver,
    ComponentNode,
} from './types';
import { COMPONENT } from './constants';
import attachEvents from './attachEvents';
import renderNodes from './renderNodes';
import checkStateType from './checkStateType';
import logError from './logError';

/**
 * Defines a new Froyo component
 * @param options configuration options
 */
function defineComponent<T extends ComponentTypes = ComponentTypes>(
    options: ComponentOptions<T>
) {
    type State = NonNullable<T['state']>;
    type EventsOptions = NonNullable<(typeof options)['events']>;
    type RenderOptions = NonNullable<(typeof options)['render']>;
    type HooksOptions = NonNullable<(typeof options)['hooks']>;

    const displayName = options.name || 'Unnamed component';
    const stateOptions = (options.state || {}) as StateOptionList;
    const nodeOptions = (options.nodes || {}) as NodeOptionList;
    const dataOptions = (options.data || {}) as DataOptionList;
    const componentOptions = (options.components || {}) as ComponentOptionList;
    const eventOptions = (options.events || {}) as EventsOptions;
    const renderOptions = (options.render || {}) as RenderOptions;
    const hookOptions = (options.hooks || {}) as HooksOptions;
    const cleanupTasks: Set<() => void> = new Set();
    const renderTasks: Set<[string, RenderOption]> = new Set();
    const stateHooks: Map<string, ComponentStateHook> = new Map();
    const components: Set<[string, ComponentInstance]> = new Set();
    const observers: Set<[keyof State, ComponentObserver]> = new Set();
    let ready = false;

    const $this = new Proxy({} as ComponentThis, {
        set(target, property: string, value) {
            const previousValue = target[property];
            const isState = property in stateOptions;
            let hasChanged = value !== previousValue;
            let nextValue = value;

            if (isState && nextValue === undefined) {
                nextValue = stateOptions[property].default;
                hasChanged = nextValue !== previousValue;
            }

            if (process.env.NODE_ENV !== 'production') {
                if (isState && (!ready || (ready && hasChanged))) {
                    checkStateType(property, nextValue, stateOptions[property]);
                }
            }

            /* eslint-disable no-param-reassign */
            target[property] = nextValue;
            /* eslint-enable no-param-reassign */

            if (ready && isState && hasChanged) {
                const stateHook = stateHooks.get(property);

                renderNodes.call(target, renderTasks);

                if (stateHook) {
                    stateHook.call(target, value, previousValue);
                }

                observers.forEach(([name, observer]) => {
                    if (property === name) {
                        observer.call(undefined, value, previousValue);
                    }
                });

                components.forEach(([name, instance]) => {
                    const { state } = componentOptions[name].call(target);

                    if (state) instance.setState(state);
                });
            }

            return true;
        },
    });

    return class Component implements ComponentInstance<T> {
        static readonly $$typeof = COMPONENT;

        static get displayName() {
            return displayName;
        }

        public get root(): NonNullable<T['root']> {
            return $this.$root;
        }

        public get state() {
            const state: Record<string, any> = {};

            Object.keys(stateOptions).forEach((property) => {
                if (property in $this) {
                    state[property] = $this[property];
                }
            });

            return state as State;
        }

        constructor(root: ComponentRoot, state: Partial<State> = {}) {
            let rootElement: Element | null = null;
            let htmlState: ComponentState = {};

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
                    `${displayName}: the component root must be a valid HTML element`
                );
            }

            try {
                const value = rootElement.getAttribute('data-state');

                if (value !== null) {
                    htmlState = JSON.parse(value);
                }
            } catch {
                logError('E15', { name: displayName });
            }

            Object.keys(stateOptions).forEach((property) => {
                let value: any;

                if (property in htmlState) value = htmlState[property];
                if (property in state) value = state[property];

                $this[property] = value;
            });

            Object.entries(nodeOptions).forEach(([property, option]) => {
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
                    const scope = option.scope || $this.$root;

                    node = scope.querySelector(selector);

                    if (!node && !optional) {
                        logError('E16', {
                            name: displayName,
                            property,
                            selector,
                        });
                    }
                } else if (type === 'query-all' && option.selector) {
                    const { selector, optional } = option;
                    const scope = option.scope || $this.$root;

                    node = Array.from(scope.querySelectorAll(selector));

                    if (node.length === 0 && !optional) {
                        logError('E17', {
                            name: displayName,
                            property,
                            selector,
                        });
                    }
                }

                $this[property] = node;
            });

            Object.entries(dataOptions).forEach(([property, option]) => {
                let value = option;

                if (typeof option === 'function') {
                    value = option.bind($this);
                }

                $this[property] = value;
            });

            Object.entries(eventOptions).forEach(([property, option]) => {
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
                    logError('E18', { name: displayName, property });
                }

                targets.forEach((target, index) => {
                    const position = Array.isArray(node) ? index : undefined;
                    const events = option.call($this, position);

                    cleanupTasks.add(attachEvents(property, target, events));
                });
            });

            Object.entries(componentOptions).forEach(([property, option]) => {
                const config = option.call($this);
                const { constructor, subscribe } = config;
                const instance = new constructor(config.root, config.state);

                if (subscribe) {
                    Object.entries(subscribe).forEach(([name, callback]) => {
                        if (typeof callback === 'function') {
                            instance.subscribe(name, callback);
                        } else {
                            logError('E27', {
                                name: displayName,
                                component: constructor.displayName,
                                property: name,
                            });
                        }
                    });
                }

                components.add([property, instance]);
                cleanupTasks.add(() => instance.destroy());
            });

            Object.entries(hookOptions).forEach(([property, option]) => {
                if (property === '$setup') {
                    (option as ComponentLifecycleHook).call($this);
                } else if (property === '$teardown') {
                    cleanupTasks.add(
                        (option as ComponentLifecycleHook).bind($this)
                    );
                } else if (property in stateOptions) {
                    const value = $this[property];

                    option.call($this, value, value);
                    stateHooks.set(property, option);
                } else {
                    logError('E19', { name: displayName, property });
                }
            });

            Object.entries(renderOptions).forEach(([property, option]) => {
                if (property in $this) {
                    renderTasks.add([property, option]);
                } else {
                    logError('E20', { name: displayName, property });
                }
            });

            renderNodes.call($this, renderTasks);

            ready = true;
        }

        destroy(): void {
            cleanupTasks.forEach((cleanup) => cleanup());
        }

        setState(stateChanges: Partial<State>): void {
            Object.entries(stateChanges).forEach(([property, value]) => {
                if (property in stateOptions) {
                    if (stateOptions[property].readonly) {
                        logError('E21', { name: displayName, property });
                    } else {
                        $this[property] = value;
                    }
                } else {
                    logError('E22', { name: displayName, property });
                }
            });
        }

        subscribe<P extends keyof State, O extends ComponentObserver<State[P]>>(
            property: P,
            observer?: O
        ) {
            const name = String(property);

            if (!(property in $this)) {
                logError('E23', { name: displayName, property: name });
                return;
            }

            if (typeof observer !== 'function') {
                logError('E24', { name: displayName, property: name });
                return;
            }

            const result = Array.from(observers).find(
                (entry) => entry[0] === property && entry[1] === observer
            );

            if (!result) {
                observers.add([property, observer]);
            }
        }

        unsubscribe<
            P extends keyof State,
            O extends ComponentObserver<State[P]>
        >(property: P, observer?: O): void {
            const name = String(property);

            if (!(property in $this)) {
                logError('E25', { name: displayName, property: name });
                return;
            }

            if (typeof observer !== 'function') {
                logError('E26', { name: displayName, property: name });
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
