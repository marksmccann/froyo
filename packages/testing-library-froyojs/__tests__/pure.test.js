import { Component, createElement } from 'froyojs';
import { render, cleanup } from '../src/pure';

describe('render and cleanup', () => {
    class Foo extends Component {
        render() {
            const { rootElement, state } = this;

            rootElement.innerHTML = state.text || 'foo';
        }
    }

    afterEach(() => {
        cleanup();
    });

    it('should return expected results', () => {
        const result = render('<div></div>', (root) => new Foo(root));

        expect(result.baseElement).toStrictEqual(document.body);
        expect(result.rootElement).toBeInstanceOf(window.HTMLElement);
        expect(typeof result.getByText).toBe('function');
        expect(typeof result.rerender).toBe('function');
        expect(typeof result.destroy).toBe('function');
    });

    it('should render root element as string', () => {
        const result = render('<div></div>', (root) => new Foo(root));

        expect(result.baseElement).toStrictEqual(document.body);
        expect(document.body).toContainElement(result.rootElement);
        expect(result.rootElement).toHaveTextContent('foo');
    });

    it('should render root element as DOM element', () => {
        const div = createElement('div', null, 'foo');
        const result = render(div, (root) => new Foo(root));

        expect(result.baseElement).toStrictEqual(document.body);
        expect(document.body).toContainElement(result.rootElement);
        expect(result.rootElement).toHaveTextContent('foo');
    });

    it('should fail if the root element is undefined', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        const results = render();

        expect(Object.keys(results)).toHaveLength(0);
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('root element must be a valid')
        );
    });

    it('should remove root element from body when destroyed', () => {
        const rootElement = createElement('div');
        const result = render(rootElement, (root) => new Foo(root));

        expect(document.body).toContainElement(rootElement);

        result.destroy();

        expect(document.body).not.toContainElement(rootElement);
    });

    it('should support a custom container', () => {
        const container = createElement('div');
        const result = render('<div></div>', (root) => new Foo(root), {
            container,
        });

        expect(result.rootElement).toHaveTextContent('foo');
        expect(result.baseElement).toStrictEqual(container);
        expect(container).toContainElement(result.rootElement);
        expect(document.body).not.toContainElement(container);
    });

    it('should remove container from body when destroyed', () => {
        const container = createElement('div');
        const result = render('<div></div>', (root) => new Foo(root), {
            container: document.body.appendChild(container),
        });

        expect(document.body).toContainElement(container);

        result.destroy();

        expect(document.body).not.toContainElement(container);
    });

    it('should support a custom base element', () => {
        const baseElement = createElement('div');
        const result = render('<div></div>', (root) => new Foo(root), {
            baseElement,
        });

        expect(result.baseElement).toStrictEqual(baseElement);
        expect(result.baseElement).toContainElement(result.rootElement);
        expect(document.body).not.toContainElement(result.baseElement);
    });

    it('should call initialize callback with root element', () => {
        const callback = jest.fn();
        const result = render('<div></div>', (root) => {
            callback(root);
            return new Foo(root);
        });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(result.rootElement);
    });

    it('should fail if initialize is undefined', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        const results = render('<div></div>');

        expect(Object.keys(results)).toHaveLength(0);
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('function that returns a Froyo component')
        );
    });

    it('should fail if initialize does not return instance', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        const results = render('<div></div>', () => {});

        expect(Object.keys(results)).toHaveLength(0);
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('function that returns a Froyo component')
        );
    });

    it('should retrieve data from previously rendered root element', () => {
        const rootElement = createElement('div');
        const results1 = render(rootElement, (root) => new Foo(root));
        const results2 = render(rootElement, (root) => new Foo(root));

        expect(results1.destroy).toStrictEqual(results2.destroy);
    });

    it('should rerender a component', () => {
        const result = render('<div></div>', (root) => new Foo(root));

        expect(result.rootElement).toHaveTextContent('foo');

        result.rerender({ text: 'bar' });

        expect(result.rootElement).toHaveTextContent('bar');
    });

    it('should not fail if rerender or destroy are called after destroy', () => {
        const result = render('<div></div>', (root) => new Foo(root));

        result.destroy();

        expect(() => {
            result.rerender({});
            result.rerender();
            result.destroy();
        }).not.toThrow();
    });
});
