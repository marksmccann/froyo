import createElement from '../src/createElement';

describe('createElement', () => {
    it('should create element', () => {
        const element = createElement('div', { id: 'foo' }, 'bar');

        expect(element).toBeInstanceOf(window.HTMLElement);
        expect(element.tagName).toBe('DIV');
        expect(element).toHaveAttribute('id', 'foo');
        expect(element).toHaveTextContent('bar');
    });

    it('should append element as child', () => {
        const child = createElement('div');
        const element = createElement('div', { id: 'foo' }, child);

        expect(element.firstChild).toStrictEqual(child);
    });
});
