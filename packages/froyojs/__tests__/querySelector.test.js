import querySelector from '../src/querySelector';

describe('querySelector', () => {
    it('should retrieve element', () => {
        document.body.innerHTML = '<div></div>';
        const element = querySelector(document.body, 'div');

        expect(element).toStrictEqual(document.body.firstChild);
    });

    it('should find element by child depth', () => {
        document.body.innerHTML =
            '<div><div><div><span></span></div></div></div>';
        const element = document.querySelector('span');
        const element0 = querySelector(document.body, 'span', { depth: -1 });
        const element1 = querySelector(document.body, 'span', { depth: 0 });
        const element2 = querySelector(document.body, 'span', { depth: 1 });
        const element3 = querySelector(document.body, 'span', { depth: 2 });
        const element4 = querySelector(document.body, 'span', { depth: 3 });

        expect(element0).toStrictEqual(element);
        expect(element1).toBeNull();
        expect(element2).toBeNull();
        expect(element3).toBeNull();
        expect(element4).toStrictEqual(element);
    });
});
