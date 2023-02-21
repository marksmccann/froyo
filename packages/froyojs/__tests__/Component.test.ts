/* eslint-disable max-classes-per-file, class-methods-use-this */

import PropTypes from 'prop-types';

import Component from '../src/Component';
import createElement from '../src/createElement';
import addEventListener from '../src/addEventListener';
import createMutationObserver from '../src/createMutationObserver';
import createMediaQueryListener from '../src/createMediaQueryListener';

interface FroyoState {
    [key: string]: any;
}

describe('component', () => {
    it('should fail if root element is missing', () => {
        class Foo extends Component {}

        // @ts-ignore
        expect(() => new Foo()).toThrow(/root element must be an HTML element/);
    });

    it('should set initial state via HTML', () => {
        class Foo extends Component {}
        const initialState = JSON.stringify({ foo: 'bar' });
        const rootElement = createElement('div', {
            'data-initial-state': initialState,
        });
        const instance = new Foo(rootElement);

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should set initial state via constructor', () => {
        class Foo extends Component {}
        const rootElement = createElement('div');
        const instance = new Foo(rootElement, { foo: 'bar' });

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should favor initial state from constructor over HTML', () => {
        class Foo extends Component {}
        const initialState = JSON.stringify({ foo: 'bar' });
        const rootElement = createElement('div', {
            'data-initial-state': initialState,
        });
        const instance = new Foo(rootElement, { foo: 'baz' });

        expect(instance.state.foo).toBe('baz');

        instance.destroy();
    });

    it('should fail if HTML initial state is invalid JSON', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        class Foo extends Component {}
        const rootElement = createElement('div', {
            'data-initial-state': '',
        });
        const instance = new Foo(rootElement);

        expect(instance.state).toStrictEqual(expect.objectContaining({}));
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('must contain valid JSON')
        );

        instance.destroy();
    });

    it('should initialize with a query selector', () => {
        class Foo extends Component {}
        const rootElement = document.body.appendChild(
            createElement('div', { id: 'foo' })
        );
        const instance = new Foo('#foo');

        expect(instance.rootElement).toStrictEqual(rootElement);

        instance.destroy();
        rootElement.remove();
    });

    it('should set instance properties', () => {
        class Foo extends Component {}
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(instance.rootElement).toStrictEqual(rootElement);
        expect(instance.state).toStrictEqual(expect.any(Object));

        instance.destroy();
    });

    it('should set instance properties in initialize', () => {
        class Foo extends Component {
            render() {}
        }
        class Bar extends Component {
            setup() {
                this.components = {
                    foo: new Foo(this.rootElement),
                };

                this.elements = {
                    foo: this.rootElement.querySelector('div'),
                };

                this.listeners = {
                    foo: addEventListener(this.rootElement, 'click', () => {}),
                    bar: createMediaQueryListener(
                        '(min-width: 500px)',
                        () => {}
                    ),
                    baz: createMutationObserver(document, () => {}, {
                        attributes: true,
                    }),
                };

                this.state = {
                    foo: 'bar',
                };
            }

            validate() {
                expect(this.components.foo).toBeInstanceOf(Foo);
                expect(this.elements.foo).toStrictEqual(
                    this.rootElement.firstChild
                );
                expect(this.listeners.foo).toStrictEqual(
                    expect.objectContaining({ destroy: expect.any(Function) })
                );
            }
        }
        const rootElement = createElement('div', null, '<div></div>');
        const instance = new Bar(document.body.appendChild(rootElement));

        expect(instance.state.foo).toBe('bar');

        rootElement.remove();
        instance.destroy();
    });

    it('should assign valid DOM nodes to elements property', () => {
        class Foo extends Component {
            setup() {
                this.elements = {
                    null: null,
                    createElement: createElement('div'),
                    querySelector: this.rootElement.querySelector('div'),
                    textNode: document.createTextNode('foo'),
                    selectorAll: this.rootElement.querySelectorAll('div'),
                    byTagName: this.rootElement.getElementsByTagName('div'),
                };
            }

            validate() {
                expect(this.elements.null).toBeNull();
                expect(this.elements.createElement).toBeInstanceOf(Node);
                expect(this.elements.querySelector).toBeInstanceOf(Node);
                expect(this.elements.textNode).toBeInstanceOf(Node);
                expect(Array.isArray(this.elements.selectorAll)).toBe(true);
                expect(this.elements.selectorAll).toHaveLength(2);
                expect(Array.isArray(this.elements.byTagName)).toBe(true);
                expect(this.elements.byTagName).toHaveLength(2);
            }
        }
        const instance = new Foo(
            createElement('div', null, `<div></div><div></div>`)
        );

        instance.destroy();
    });

    it('should fail if property assignments are invalid', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        class Foo extends Component {
            setup() {
                // @ts-ignore
                this.elements = { foo: '' };
                // @ts-ignore
                this.components = { foo: null };
                // @ts-ignore
                this.listeners = { foo: null };
            }

            validate() {
                expect(this.components.foo).toBeUndefined();
                expect(this.listeners.foo).toBeUndefined();
                expect(this.elements.foo).toBeUndefined();
            }
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(3);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is not an instance of "Component"')
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is missing a "destroy" function')
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is not a valid DOM node')
        );

        instance.destroy();
    });

    it('should fail if state is updated directly', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        class Foo extends Component {}
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(instance.state.foo).toBeUndefined();

        // @ts-ignore
        instance.state = { foo: 'bar' };

        expect(instance.state.foo).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('only be updated via "setState"')
        );

        instance.destroy();
    });

    it('should replace previously defined properties', () => {
        class Foo extends Component {}
        const rootElement = createElement('div');
        const component1 = new Foo(rootElement);
        const component2 = new Foo(rootElement);
        const listener1 = addEventListener(rootElement, 'click', () => {});
        const listener2 = addEventListener(rootElement, 'click', () => {});
        class Bar extends Component {
            setup() {
                this.components = { foo: component1 };
                this.listeners = { foo: listener1 };

                expect(this.components.foo).toStrictEqual(component1);
                expect(this.listeners.foo).toStrictEqual(listener1);
            }

            update() {
                this.components = { foo: component2 };
                this.listeners = { foo: listener2 };

                expect(this.components.foo).toStrictEqual(component2);
                expect(this.listeners.foo).toStrictEqual(listener2);
            }
        }

        const instance = new Bar(rootElement);

        // update the state to force it to rerender
        instance.setState({ foo: 'bar' });

        instance.destroy();
    });

    it('should default state from "defaultState"', () => {
        class Foo extends Component {
            static get defaultState() {
                return { foo: 'bar' };
            }
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(instance.state.foo).toBe('bar');

        instance.setState({ foo: null });

        expect(instance.state.foo).toBeNull();

        instance.setState({ foo: 'baz' });

        expect(instance.state.foo).toBe('baz');

        instance.setState({ foo: undefined });

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should call lifecycle methods on state change', () => {
        const validateSpy = jest.fn();
        const renderSpy = jest.fn();
        const updateSpy = jest.fn();
        class Foo extends Component {
            validate(
                stateChanges: FroyoState,
                previousState: FroyoState,
                instance: Foo
            ) {
                validateSpy(stateChanges, previousState, instance);
            }

            render(
                stateChanges: FroyoState,
                previousState: FroyoState,
                instance: Foo
            ) {
                renderSpy(stateChanges, previousState, instance);
            }

            update(
                stateChanges: FroyoState,
                previousState: FroyoState,
                instance: Foo
            ) {
                updateSpy(stateChanges, previousState, instance);
            }
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(validateSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(validateSpy).toHaveBeenCalledWith({}, {}, instance);
        expect(renderSpy).toHaveBeenCalledWith({}, {}, instance);
        expect(updateSpy).toHaveBeenCalledWith({}, {}, instance);

        instance.setState({ foo: 'bar' });

        expect(validateSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledTimes(2);
        expect(updateSpy).toHaveBeenCalledTimes(2);
        expect(validateSpy).toHaveBeenCalledWith({ foo: 'bar' }, {}, instance);
        expect(renderSpy).toHaveBeenCalledWith({ foo: 'bar' }, {}, instance);
        expect(updateSpy).toHaveBeenCalledWith({ foo: 'bar' }, {}, instance);

        instance.setState({ foo: 'bar' });

        expect(validateSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledTimes(2);
        expect(updateSpy).toHaveBeenCalledTimes(2);

        instance.destroy();
    });

    it('should call observers subscribed to instance', () => {
        const callback = jest.fn();
        class Foo extends Component {}
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        instance.subscribe(callback);
        instance.subscribe(callback);
        instance.setState({ foo: 'bar' });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith({ foo: 'bar' }, {}, instance);

        instance.unsubscribe(callback);
        instance.unsubscribe(callback);
        instance.setState({ foo: 'baz' });

        expect(callback).toHaveBeenCalledTimes(1);

        instance.destroy();
    });

    it('should fail if observer is invalid', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        class Foo extends Component {}
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        // @ts-ignore
        instance.subscribe();

        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('a function must be provided')
        );

        instance.destroy();
    });

    it('should type-check state properties', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        class Foo extends Component {
            static get stateTypes() {
                return { foo: PropTypes.string };
            }
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement, { foo: true });

        expect(instance.state.foo).toBe(true);
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('Failed state type')
        );

        instance.destroy();
    });

    it('should not type-check state in production', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error');
        process.env.NODE_ENV = 'production';

        class Foo extends Component {
            static get stateTypes() {
                return { foo: PropTypes.string };
            }
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement, { foo: true });

        expect(instance.state.foo).toBe(true);
        expect(consoleErrorSpy).not.toHaveBeenCalled();

        instance.destroy();
    });

    it('should store component instances in static variable', () => {
        class Foo1 extends Component {}
        class Foo2 extends Component {}
        const instance1 = new Foo1(createElement('div'));
        const instance2 = new Foo2(createElement('div'));

        expect(Component.instances).toHaveLength(2);
        expect(Component.instances[0]).toStrictEqual(instance1);
        expect(Component.instances[1]).toStrictEqual(instance2);

        instance1.destroy();
        instance2.destroy();
    });
});
