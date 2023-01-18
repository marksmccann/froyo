/* eslint-disable max-classes-per-file, class-methods-use-this */

import PropTypes from 'prop-types';

import Component from '../src/Component';
import createElement from '../src/createElement';
import addEventListener from '../src/addEventListener';

describe('component', () => {
    it('should fail if root element is missing', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        class Foo extends Component {
            render() {}
        }
        const instance = new Foo();

        expect(instance.metadata.id).toBeUndefined();
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('root element must be an HTML element')
        );

        instance.destroy();
    });

    it('should fail if render method is missing', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        class Foo extends Component {}
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(instance.metadata.id).toBeUndefined();
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('must have a "render" method')
        );

        instance.destroy();
    });

    it('should set initial state via HTML', () => {
        class Foo extends Component {
            render() {}
        }
        const initialState = JSON.stringify({ foo: 'bar' });
        const rootElement = createElement('div', {
            'data-initial-state': initialState,
        });
        const instance = new Foo(rootElement);

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should set initial state via constructor', () => {
        class Foo extends Component {
            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement, { foo: 'bar' });

        expect(instance.state.foo).toBe('bar');

        instance.destroy();
    });

    it('should favor initial state from constructor over HTML', () => {
        class Foo extends Component {
            render() {}
        }
        const initialState = JSON.stringify({ foo: 'bar' });
        const rootElement = createElement('div', {
            'data-initial-state': initialState,
        });
        const instance = new Foo(rootElement, { foo: 'baz' });

        expect(instance.state.foo).toBe('baz');

        instance.destroy();
    });

    it('should fail if HTML initial state is invalid JSON', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        class Foo extends Component {
            render() {}
        }
        const rootElement = createElement('div', {
            'data-initial-state': 'foo',
        });
        const instance = new Foo(rootElement);

        expect(instance.state).toStrictEqual(expect.objectContaining({}));
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('must contain valid JSON')
        );

        instance.destroy();
    });

    it('should set instance properties', () => {
        class Foo extends Component {
            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(instance.rootElement).toStrictEqual(rootElement);
        expect(instance.metadata.id).toStrictEqual(expect.any(String));
        expect(instance.metadata.initialized).toBe(true);
        expect(instance.components).toStrictEqual(expect.any(Object));
        expect(instance.listeners).toStrictEqual(expect.any(Object));
        expect(instance.state).toStrictEqual(expect.any(Object));

        instance.destroy();
    });

    it('should set instance properties in initialize', () => {
        class Foo extends Component {
            render() {}
        }
        class Bar extends Component {
            initialize() {
                this.components = {
                    foo: new Foo(this.rootElement),
                };

                this.elements = {
                    foo: this.rootElement.querySelector('div'),
                };

                this.listeners = {
                    foo: addEventListener(this.rootElement, 'click', () => {}),
                };

                this.state = {
                    foo: 'bar',
                };
            }

            render() {}
        }
        const rootElement = createElement('div', null, '<div></div>');
        const instance = new Bar(document.body.appendChild(rootElement));

        expect(instance.state.foo).toBe('bar');
        expect(instance.components.foo).toBeInstanceOf(Foo);
        expect(instance.elements.foo).toStrictEqual(rootElement.firstChild);
        expect(instance.listeners.foo).toStrictEqual(
            expect.objectContaining({ destroy: expect.any(Function) })
        );

        rootElement.remove();
        instance.destroy();
    });

    it('should fail if property assignments are invalid', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        class Foo extends Component {
            initialize() {
                this.components = { foo: null };
                this.listeners = { foo: null };
            }

            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(instance.components.foo).toBeUndefined();
        expect(instance.listeners.foo).toBeUndefined();
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(2);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is not an instance of "Component"')
        );
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('is missing a "destroy" function')
        );

        instance.destroy();
    });

    it('should fail if state is updated directly', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        class Foo extends Component {
            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        expect(instance.state.foo).toBeUndefined();

        instance.state = { foo: 'bar' };

        expect(instance.state.foo).toBeUndefined();
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('only be updated via "setState"')
        );

        instance.destroy();
    });

    it('should replace previously defined properties', () => {
        class Foo extends Component {
            render() {}
        }
        class Bar extends Component {
            initialize() {
                this.components = {
                    foo: new Foo(this.rootElement),
                };

                this.listeners = {
                    foo: addEventListener(this.rootElement, 'click', () => {}),
                };
            }

            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Bar(rootElement);
        const { components, listeners } = instance;

        instance.components = { foo: new Foo(rootElement) };
        instance.listeners = {
            foo: addEventListener(rootElement, 'click', () => {}),
        };

        expect(components.foo).not.toStrictEqual(instance.components.foo);
        expect(listeners.foo).not.toStrictEqual(instance.listeners.foo);

        instance.destroy();
    });

    it('should default state from "defaultState"', () => {
        class Foo extends Component {
            static get defaultState() {
                return { foo: 'bar' };
            }

            render() {}
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
            validate(...args) {
                validateSpy(...args);
            }

            render(...args) {
                renderSpy(...args);
            }

            update(...args) {
                updateSpy(...args);
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
        class Foo extends Component {
            render() {}
        }
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
        global.consoleErrorSpy.mockImplementation(() => {});

        class Foo extends Component {
            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement);

        instance.subscribe();

        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('a function must be provided')
        );

        instance.destroy();
    });

    it('should type-check state properties', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        class Foo extends Component {
            static get stateTypes() {
                return { foo: PropTypes.string };
            }

            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement, { foo: true });

        expect(instance.state.foo).toBe(true);
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('Failed state type')
        );

        instance.destroy();
    });

    it('should not type-check state in production', () => {
        process.env.NODE_ENV = 'production';

        class Foo extends Component {
            static get stateTypes() {
                return { foo: PropTypes.string };
            }

            render() {}
        }
        const rootElement = createElement('div');
        const instance = new Foo(rootElement, { foo: true });

        expect(instance.state.foo).toBe(true);
        expect(global.consoleErrorSpy).not.toHaveBeenCalled();

        instance.destroy();
    });
});
