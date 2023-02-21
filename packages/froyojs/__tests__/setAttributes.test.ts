import createElement from '../src/createElement';
import setAttributes from '../src/setAttributes';

describe('setAttributes', () => {
    it('should set attributes', () => {
        const element = createElement('div');

        expect(element).not.toHaveAttribute('id');

        setAttributes(element, { id: 'foo' });

        expect(element).toHaveAttribute('id', 'foo');
    });

    it('should remove attributes if null', () => {
        const element = createElement('div', { id: 'foo' });

        expect(element).toHaveAttribute('id', 'foo');

        setAttributes(element, { id: null });

        expect(element).not.toHaveAttribute('id');
    });

    it('should ignore attributes if undefined', () => {
        const element = createElement('div', { id: 'foo' });

        expect(element).toHaveAttribute('id', 'foo');

        setAttributes(element, { id: undefined });

        expect(element).toHaveAttribute('id', 'foo');
    });

    it('should not require attributes object', () => {
        const element = createElement('div');

        expect(() => setAttributes(element)).not.toThrow();
    });
});
