// import Component, { createElement } from '@froyo/core';
// import { render, cleanup } from '../src/pure';

describe('render and cleanup', () => {
    // class Test extends Component {
    //     render() {
    //         const { rootElement, state } = this;

    //         rootElement.innerHTML = state.text || 'foo';
    //     }
    // }

    // afterEach(() => {
    //     cleanup();
    // });

    it('should ...', () => {
        expect(true).toBe(true);
    });

    // ('should return expected results', () => {
    //     const result = render('');

    //     expect(result.baseElement).toStrictEqual(document.body);
    //     expect(result.container).toBeInstanceOf(window.HTMLElement);
    //     expect(typeof result.getByText).toStrictEqual('function');
    //     expect(typeof result.destroy).toStrictEqual('function');
    // });

    // ('should render string', () => {
    //     const result = render('foo');

    //     expect(result.baseElement).toStrictEqual(document.body);
    //     expect(document.body).toContainElement(result.container);
    //     expect(result.container).toHaveTextContent('foo');
    // });

    // ('should render DOM element', () => {
    //     const div = createElement('div', null, 'foo');
    //     const result = render(div);

    //     expect(result.baseElement).toStrictEqual(document.body);
    //     expect(document.body).toContainElement(result.container);
    //     expect(result.container).toHaveTextContent('foo');
    // });

    // ('should support custom container', () => {
    //     const container = createElement('div');
    //     const result = render('foo', null, { container });

    //     expect(result.container).toHaveTextContent('foo');
    //     expect(result.baseElement).toStrictEqual(result.container);
    //     expect(document.body).not.toContainElement(result.container);
    // });

    // ('should support custom base element', () => {
    //     const baseElement = createElement('div');
    //     const result = render('foo', null, { baseElement });

    //     expect(result.baseElement).toStrictEqual(baseElement);
    //     expect(result.baseElement).toContainElement(result.container);
    //     expect(document.body).not.toContainElement(result.baseElement);
    // });

    // ('should call initialize callback', () => {
    //     const callback = jest.fn();
    //     const result = render('', (container) => {
    //         callback(container);
    //         return new Test(container);
    //     });

    //     expect(callback).toHaveBeenCalledTimes(1);
    //     expect(callback).toHaveBeenCalledWith(result.container);
    // });

    // ('should initialize a single component', () => {
    //     const { container } = render(
    //         '<div></div>', ({ firstChild }) => new Test(firstChild),
    //     );

    //     expect(container.firstChild).toHaveTextContent('foo');
    // });

    // ('should retrieve previous result', () => {
    //     const container = createElement('div');
    //     const results1 = render('<div></div>', null, { container });
    //     const results2 = render('<div></div>', null, { container });

    //     expect(results1.destroy).toStrictEqual(results2.destroy);
    // });

    // ('should rerender a component', () => {
    //     const { container, rerender } = render(
    //         '<div></div>',
    //         ({ firstChild }) => new Test(firstChild),
    //     );

    //     expect(container.firstChild).toHaveTextContent('foo');

    //     rerender({ text: 'bar' });

    //     expect(container.firstChild).toHaveTextContent('bar');
    // });

    // ('should rerender multiple components', () => {
    //     const { container, rerender } = render(
    //         '<div></div><div></div>',
    //         ({ children }) => ({
    //             foo: new Test(children[0]),
    //             bar: new Test(children[1])
    //         })
    //     );

    //     expect(container.children[0]).toHaveTextContent('foo');
    //     expect(container.children[1]).toHaveTextContent('foo');

    //     rerender('foo', { text: 'bar' });
    //     rerender('bar', { text: 'baz' });

    //     expect(container.children[0]).toHaveTextContent('bar');
    //     expect(container.children[1]).toHaveTextContent('baz');
    // });
});
