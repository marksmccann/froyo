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

    it('should return expected result', () => {
        const result = render('<div id="foo"></div>', () => new Foo('#foo'));

        expect(result.baseElement).toStrictEqual(document.body);
        expect(result.container).toBeInstanceOf(window.HTMLElement);
        expect(typeof result.getByText).toBe('function');
        expect(typeof result.rerender).toBe('function');
        expect(typeof result.destroy).toBe('function');
    });

    it('should remove container from body when destroyed', () => {
        const result = render('<div id="foo"></div>', () => new Foo('#foo'));

        expect(result.container).toBeInTheDocument();

        result.destroy();

        expect(result.container).not.toBeInTheDocument();
    });

    it('should not require initialize function', () => {
        const result = render('<div>foo</div>');

        expect(result.baseElement).toStrictEqual(document.body);
        expect(result.container).toBeInstanceOf(window.HTMLElement);
    });

    it('should support a custom container', () => {
        const container = createElement('div');
        const result = render('<div id="foo"></div>', () => new Foo('#foo'), {
            container: document.body.appendChild(container),
        });

        expect(container).toContainElement(result.getByText('foo'));
        expect(result.baseElement).toStrictEqual(container);
        expect(container).toBeInTheDocument();
    });

    it('should remove custom container from body when destroyed', () => {
        const container = createElement('div');
        const result = render('<div id="foo"></div>', () => new Foo('#foo'), {
            container: document.body.appendChild(container),
        });

        expect(container).toBeInTheDocument();

        result.destroy();

        expect(container).not.toBeInTheDocument();
    });

    it('should support a custom base element', () => {
        const baseElement = createElement('div');
        const result = render(
            '<div class="foo"></div>',
            () => new Foo('.foo'),
            { baseElement: document.body.appendChild(baseElement) }
        );

        expect(result.baseElement).toStrictEqual(baseElement);
        expect(result.baseElement).toContainElement(result.container);
        expect(result.baseElement).toBeInTheDocument();
    });

    it('should call initialize callback with no arguments', () => {
        const callback = jest.fn();
        render('<div id="foo"></div>', (...args) => {
            callback(...args);
            return new Foo('#foo');
        });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith();
    });

    it('should retrieve data from previously rendered container', () => {
        const container = createElement('div');
        const result1 = render('<div id="foo"></div>', () => new Foo('#foo'), {
            container: document.body.appendChild(container),
        });
        const result2 = render('', null, { container });

        expect(result1.destroy).toStrictEqual(result2.destroy);
    });

    it('should rerender a component', () => {
        const result = render('<div id="foo"></div>', () => new Foo('#foo'));

        expect(result.queryByText('foo')).toBeInTheDocument();
        expect(result.queryByText('bar')).not.toBeInTheDocument();

        result.rerender(result.getByText('foo'), { text: 'bar' });

        expect(result.queryByText('foo')).not.toBeInTheDocument();
        expect(result.queryByText('bar')).toBeInTheDocument();

        result.rerender('#foo', { text: 'foo' });

        expect(result.queryByText('foo')).toBeInTheDocument();
        expect(result.queryByText('bar')).not.toBeInTheDocument();
    });

    it('should fail if instance is not found when rerendering', () => {
        const consoleErrorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const result = render('<div id="foo"></div>', () => new Foo('#foo'));

        expect(result.queryByText('foo')).toBeInTheDocument();

        result.rerender('bar', { text: 'bar' });

        expect(result.queryByText('foo')).toBeInTheDocument();
        expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('no component found for the root element')
        );
    });

    it('should not fail if rerender or destroy are called after destroy', () => {
        const result = render('<div id="foo"></div>', () => new Foo('#foo'));

        result.destroy();

        expect(() => {
            result.rerender('#foo');
            result.destroy();
        }).not.toThrow();
    });
});
