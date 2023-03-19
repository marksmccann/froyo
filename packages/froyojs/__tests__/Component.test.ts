/* eslint-disable max-classes-per-file, class-methods-use-this */

import PropTypes from 'prop-types';

import Component from '../src/Component';
import createElement from '../src/createElement';
import addEventListener from '../src/addEventListener';
import createMutationObserver from '../src/createMutationObserver';
import createMediaQueryListener from '../src/createMediaQueryListener';

describe('component', () => {
    it('should fail if root element is missing', () => {
        class Foo extends Component {}

        // @ts-ignore
        expect(() => new Foo()).toThrow(/root element must be an HTML element/);
    });

    it('should set initial state via HTML', () => {
        class Foo extends Component<{ foo: string }> {}
        const initialState = JSON.stringify({ foo: 'bar' });
        const rootElement = createElement('div', {
            'data-initial-state': initialState,
        });
        const instance = new Foo(rootElement);

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should set initial state via constructor', () => {
        class Foo extends Component<{ foo: string }> {}
        const rootElement = createElement('div');
        const instance = new Foo(rootElement, { foo: 'bar' });

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should favor initial state from constructor over HTML', () => {
        class Foo extends Component<{ foo: string }> {}
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
        class Bar extends Component<
            {
                foo: string;
            },
            {
                foo: HTMLElement | null;
            },
            {
                foo: ReturnType<typeof addEventListener>;
                bar: ReturnType<typeof createMediaQueryListener>;
                baz: ReturnType<typeof createMutationObserver>;
            },
            {
                foo: Foo;
            }
        > {
            setup() {
                this.state = {
                    foo: 'bar',
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

                this.components = {
                    foo: new Foo(this.rootElement),
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
        class Foo extends Component<
            {},
            {
                null: null;
                createElement: HTMLElement;
                querySelector: Node | null;
                textNode: Node;
                selectorAll: NodeList;
                byTagName: HTMLCollection;
            }
        > {
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
                expect(this.elements.selectorAll).toBeInstanceOf(NodeList);
                expect(this.elements.selectorAll).toHaveLength(2);
                expect(this.elements.byTagName).toBeInstanceOf(HTMLCollection);
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
            render() {}
        }
        class Bar extends Component<
            {},
            {},
            { foo: ReturnType<typeof addEventListener> },
            { foo: Foo }
        > {
            setup() {
                // @ts-expect-error
                this.listeners = { foo: undefined };
                // @ts-expect-error
                this.components = { foo: undefined };
            }

            validate() {
                expect(this.components.foo).toBeUndefined();
                expect(this.listeners.foo).toBeUndefined();
            }
        }
        const rootElement = createElement('div');
        const instance = new Bar(rootElement);

        expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is not an instance of "Component"')
        );
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is missing a "destroy" function')
        );

        instance.destroy();
    });

    it('should fail if state is updated directly', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        class Foo extends Component<{ foo: string }> {}
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

    it('should default state from "defaultState"', () => {
        class Foo extends Component<{ foo: string | null }> {
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
        type State = {};
        class Foo extends Component<State> {
            protected validate(
                stateChanges: Partial<State>,
                previousState: {}
            ): void {
                validateSpy(stateChanges, previousState);
            }

            protected render(
                stateChanges: Partial<State>,
                previousState: {}
            ): void {
                renderSpy(stateChanges, previousState);
            }

            protected update(
                stateChanges: Partial<State>,
                previousState: {}
            ): void {
                updateSpy(stateChanges, previousState);
            }
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(validateSpy).toHaveBeenCalledTimes(1);
        expect(renderSpy).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(validateSpy).toHaveBeenCalledWith({}, {});
        expect(renderSpy).toHaveBeenCalledWith({}, {});
        expect(updateSpy).toHaveBeenCalledWith({}, {});

        instance.setState({ foo: 'bar' });

        expect(validateSpy).toHaveBeenCalledTimes(2);
        expect(renderSpy).toHaveBeenCalledTimes(2);
        expect(updateSpy).toHaveBeenCalledTimes(2);
        expect(validateSpy).toHaveBeenCalledWith({ foo: 'bar' }, {});
        expect(renderSpy).toHaveBeenCalledWith({ foo: 'bar' }, {});
        expect(updateSpy).toHaveBeenCalledWith({ foo: 'bar' }, {});

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
        expect(callback).toHaveBeenCalledWith({ foo: 'bar' }, {});

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

    it('should perform runtime type-checking for state', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        class Foo extends Component<{ foo: string }> {
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

        class Foo extends Component<{ foo: string }> {
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
});
