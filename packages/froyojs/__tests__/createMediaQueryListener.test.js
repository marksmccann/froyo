import createMediaQueryListener from '../src/createMediaQueryListener';

describe('createMediaQueryListener', () => {
    it('should create media query listener', () => {
        const listener = createMediaQueryListener(
            '(min-width: 500px)',
            () => {}
        );

        expect(listener.media.matches).toBeDefined();
        expect(listener.media.media).toBe('(min-width: 500px)');

        listener.destroy();
    });
});
