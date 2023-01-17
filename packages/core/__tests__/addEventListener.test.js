import addEventListener from '../src/addEventListener';

describe('addEventListener', () => {
    it('should add event listener', () => {
        const callback = jest.fn();
        const listener = addEventListener(document, 'click', callback);

        document.body.click();

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(expect.any(Object));

        listener.destroy();
    });
});
