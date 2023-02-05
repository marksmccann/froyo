import querySelectorAll from '../src/querySelectorAll';

describe('querySelectorAll', () => {
    it('should retrieve elements in array', () => {
        document.body.innerHTML = '<div></div><div></div><div></div>';
        const elements = querySelectorAll(document.body, 'div');

        expect(elements).toHaveLength(3);
        expect(Array.isArray(elements)).toBe(true);
        expect(elements[0]).toStrictEqual(document.body.firstChild);
    });

    it('should filter elements by child depth', () => {
        document.body.innerHTML =
            '<div><div><div><div></div></div></div></div>';
        const elements0 = querySelectorAll(document.body, 'div', { depth: -1 });
        const elements1 = querySelectorAll(document.body, 'div', { depth: 0 });
        const elements2 = querySelectorAll(document.body, 'div', { depth: 1 });
        const elements3 = querySelectorAll(document.body, 'div', { depth: 2 });

        expect(elements0).toHaveLength(4);
        expect(elements1).toHaveLength(1);
        expect(elements2).toHaveLength(2);
        expect(elements3).toHaveLength(3);
    });
});
