import { Component, createElement } from 'froyojs';
import { render, cleanup } from '../src/pure';

describe('render and cleanup', () => {
    class Test extends Component {
        render() {
            const { rootElement, state } = this;

            rootElement.innerHTML = state.text || 'foo';
        }
    }

    afterEach(() => {
        cleanup();
    });

    it('should return expected results', () => {
        const result = render('');

        expect(result.baseElement).toStrictEqual(document.body);
        expect(result.container).toBeInstanceOf(window.HTMLElement);
        expect(typeof result.getByText).toBe('function');
        expect(typeof result.rerender).toBe('function');
        expect(typeof result.destroy).toBe('function');
    });

    it('should render string', () => {
        const result = render('foo');

        expect(result.baseElement).toStrictEqual(document.body);
        expect(document.body).toContainElement(result.container);
        expect(result.container).toHaveTextContent('foo');
    });

    it('should render DOM element', () => {
        const div = createElement('div', null, 'foo');
        const result = render(div);

        expect(result.baseElement).toStrictEqual(document.body);
        expect(document.body).toContainElement(result.container);
        expect(result.container).toHaveTextContent('foo');
    });

    it('should support custom container', () => {
        const container = createElement('div');
        const result = render('foo', null, { container });

        expect(result.container).toHaveTextContent('foo');
        expect(result.baseElement).toStrictEqual(result.container);
        expect(document.body).not.toContainElement(result.container);
    });

    it('should support custom base element', () => {
        const baseElement = createElement('div');
        const result = render('foo', null, { baseElement });

        expect(result.baseElement).toStrictEqual(baseElement);
        expect(result.baseElement).toContainElement(result.container);
        expect(document.body).not.toContainElement(result.baseElement);
    });

    it('should call initialize callback', () => {
        const callback = jest.fn();
        const result = render('', (container) => {
            callback(container);
            return new Test(container);
        });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(result.container);
    });

    it('should fail if the initialize callback does not return instance', () => {
        global.consoleErrorSpy.mockImplementation(() => {});

        const results = render('', () => {});

        expect(results.rerender).not.toThrow();
        expect(results.destroy).not.toThrow();
        expect(results.destroy).not.toThrow();
        expect(global.consoleErrorSpy).toHaveBeenCalledTimes(1);
        expect(global.consoleErrorSpy).toHaveBeenCalledWith(
            expect.stringContaining('must return a Froyo component')
        );
    });

    it('should initialize a single component', () => {
        const { container } = render(
            '<div></div>',
            ({ firstChild }) => new Test(firstChild)
        );

        expect(container.firstChild).toHaveTextContent('foo');
    });

    it('should retrieve previous result', () => {
        const container = createElement('div');
        const results1 = render('<div></div>', null, { container });
        const results2 = render('<div></div>', null, { container });

        expect(results1.destroy).toStrictEqual(results2.destroy);
    });

    it('should rerender a component', () => {
        const { container, rerender } = render(
            '<div></div>',
            ({ firstChild }) => new Test(firstChild)
        );

        expect(container.firstChild).toHaveTextContent('foo');

        rerender({ text: 'bar' });

        expect(container.firstChild).toHaveTextContent('bar');
    });
});
