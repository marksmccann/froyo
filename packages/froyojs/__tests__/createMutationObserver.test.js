import createMutationObserver from '../src/createMutationObserver';

describe('createMutationObserver', () => {
    it('should create mutation observer', () => {
        const listener = createMutationObserver(document, () => {}, {
            attributes: true,
        });

        expect(listener.observer).toBeInstanceOf(window.MutationObserver);

        listener.destroy();
    });
});
