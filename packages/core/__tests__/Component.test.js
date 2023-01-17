import Component from '../src/Component';

describe('Component', () => {
    it('should have display name', () => {
        expect(Component.displayName).toStrictEqual('Component');
    });
});
