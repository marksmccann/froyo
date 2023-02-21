import createElement from '../src/createElement';
import setClasses from '../src/setClasses';

describe('setClasses', () => {
    it('should set classes', () => {
        const element = createElement('div', { class: 'foo' });

        expect(element).toHaveClass('foo');
        expect(element).not.toHaveClass('bar');

        setClasses(element, { foo: false, bar: true });

        expect(element).not.toHaveClass('foo');
        expect(element).toHaveClass('bar');
    });
});
