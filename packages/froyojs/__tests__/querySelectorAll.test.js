import querySelectorAll from '../src/querySelectorAll';

describe('querySelectorAll', () => {
    it('should retrieve elements in array', () => {
        document.body.innerHTML = '<div></div><div></div><div></div>';
        const elements = querySelectorAll(document.body, 'div');

        expect(elements).toHaveLength(3);
        expect(Array.isArray(elements)).toBe(true);
        expect(elements[0]).toStrictEqual(document.body.firstChild);
    });
});
